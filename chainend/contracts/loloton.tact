import "@stdlib/ownable";
import "@stdlib/deploy";

struct LotteryRound {
    addresses: map<Address, Bool> = emptyMap();
    amount: Int as uint32 = 0;

    // How many seconds lottery round should exist
    minNumberOfSecondsPerRound: Int as uint32;
    // Last winner address
    lastWinnerAddress: Address = newAddress(0, 0);
    // When current lottery round started
    startedAt: Int as uint32 = 0;
}

extends mutates fun add(self: LotteryRound, address: Address) {
    require(null == self.addresses.get(address), "You are already in playing list");
    
    self.addresses.set(address, true);
    self.amount += 1;
}

extends mutates fun init(self: LotteryRound) {
    self.addresses = emptyMap();
    self.amount = 0;
    self.startedAt = now();
}

extends mutates fun getWinner(self: LotteryRound): Address {
    require(false == self.addresses.isEmpty(), "No users want to play in current lottery round");
    
    let indexOfWinner: Int = random(1, self.amount);
    let index: Int = 0;

    foreach (address, value in self.addresses) {
        index += 1;
        if (index == indexOfWinner) {
            return address;
        }
    }
}

contract Loloton with Deployable, Ownable {
    // Current instance lottery contract version
    const Version: String = "1.0.1";

    // Comission to payout
    const Comission: Int = ton("0");

    // It is me %)
    owner: Address;

    lotteryRound: LotteryRound;

    // Number of rounds already finished
    numberOfFinishedLotteryRounds: Int as uint32 = 0;

    // Max number of addreses to take part per one lotery round (maybe it is usefull for storage minimization)
    maxNumberOfAdressesPerRound: Int as uint32;

    // How many percents pay for winner
    percentPayToWinner: Int as uint32;

    // How many percents pay for winner
    lotteryTicketPrice: Int as uint32;

    init(minNumberOfSecondsPerRound: Int, maxNumberOfAdressesPerRound: Int, lotteryTicketPrice: Int, percentPayToWinner: Int) {
        self.owner = sender();

        self.maxNumberOfAdressesPerRound = maxNumberOfAdressesPerRound;
        self.lotteryTicketPrice = lotteryTicketPrice;
        self.percentPayToWinner = percentPayToWinner;

        self.lotteryRound = LotteryRound{
            minNumberOfSecondsPerRound: minNumberOfSecondsPerRound,
        };
    }

    fun iniNewRound() {
        self.lotteryRound.init();
        self.numberOfFinishedLotteryRounds += 1;
    }

    fun payoutInCurrentRound() {
        require(abs(now() - self.lastTimePlayed) >= self.minNumberOfSecondsPerRound, "Current lottery round cannot be completed yet");

        let valuePayToWinner: Int = 0;

        // if only one user - return all money back to his address
        if (1 == self.addreses.length) {
            valuePayToWinner = self.lotteryTicketPrice;
            self.lastWinnerAddress = self.addreses.getFirstElement();
        } else {
            valuePayToWinner = self.addreses.length * self.lotteryTicketPrice * self.percentPayToWinner / 100;
            self.lastWinnerAddress = self.addreses.getRandomElement();
        }

        valuePayToWinner -= self.Comission;

        // Make payout to winner
        send(SendParameters{
            to: self.lastWinnerAddress,
            value: valuePayToWinner,
            mode: SendIgnoreErrors,
            body: "Congratulations! You win!".asComment(),
        });
        
        // Init new lottery round
        self.iniNewRound();
    }

    fun playInCurrentRound() {
        require(context().value == self.lotteryTicketPrice, "Incorrect TON amount to play");
        require(self.addreses.amount <= self.maxNumberOfAdressesPerRound, "No space for new user in current lottery round, please, wait");

        self.addreses.add(sender());
    }

    receive() {
        self.playInCurrentRound();
    }

    receive("play") {
        self.playInCurrentRound();
    }

    receive("payout") {
        self.requireOwner();

        self.payoutCurrentRound();
    }

    get fun version(): String {
        return self.Version;
    }

    get fun numberOfFinishedLotteryRounds(): Int {
        return self.numberOfFinishedLotteryRounds;
    }

    get fun maxNumberOfAdressesPerRound(): Int {
        return self.maxNumberOfAdressesPerRound;
    }

    get fun balance(): Int {
        return myBalance(); // current contract balance in nano-tons
    }
}
