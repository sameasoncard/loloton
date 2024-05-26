import "@stdlib/ownable";
import "@stdlib/deploy";
import "@stdlib/stoppable";

struct LotteryRound {
    addresses: map<Int, Address>;
    amount: Int as uint32;
    // How many seconds lottery round should exist
    minNumberOfSecondsPerRound: Int as uint32;
    // Last winner address
    lastWinnerAddress: Address;
    // When current lottery round started
    startedAt: Int as uint32;
}

extends mutates fun add(self: LotteryRound, address: Address) {
    let index: Int = 0;
    let isAddressFound: Bool = false;
    while ((index < self.amount) && !isAddressFound) {
        if (address == self.addresses.get(index)!!) {
            isAddressFound = true;
        }
        index += 1;
    }

    require(!isAddressFound, "You are already in playing list");
    
    self.addresses.set(self.amount, address);
    self.amount += 1;
}

extends mutates fun init(self: LotteryRound) {
    self.addresses = emptyMap();
    self.amount = 0;
    self.startedAt = now();
}

extends mutates fun onlyOneAddress(self: LotteryRound): Bool {
    return 1 == self.amount;
}

extends mutates fun isEmpty(self: LotteryRound): Bool {
    return 0 == self.amount;
}

extends mutates fun canMakePayout(self: LotteryRound): Bool {
    return abs(now() - self.startedAt) >= self.minNumberOfSecondsPerRound;
}

extends mutates fun getWinner(self: LotteryRound): Address {
    require(!self.isEmpty(), "No users want to play in current lottery round");
    
    let indexOfWinner: Int = random(0, self.amount - 1);
    self.lastWinnerAddress = self.addresses.get(indexOfWinner)!!;

    return self.lastWinnerAddress;
}

contract Loloton with Deployable, Ownable, Resumable {
    // Current instance lottery contract version
    const Version: String = "1.0.1";

    // Comission to payout
    const Comission: Int = ton("0");

    // It is me %)
    owner: Address;

    stopped: Bool;

    lotteryRound: LotteryRound;

    // Number of rounds already finished
    numberOfFinishedLotteryRounds: Int as uint32 = 0;

    // Max number of addreses to take part per one lotery round (maybe it is usefull for storage minimization)
    maxNumberOfAdressesPerRound: Int as uint32;

    // How many percents pay for winner
    lotteryTicketPrice: Int;

    // How many percents pay for winner
    percentPayToWinner: Int as uint32;

    init(minNumberOfSecondsPerRound: Int, maxNumberOfAdressesPerRound: Int, lotteryTicketPrice: Int, percentPayToWinner: Int) {
        self.owner = sender();
        self.stopped = false;

        self.lotteryRound = LotteryRound{
            addresses: emptyMap(),
            amount: 0,
            minNumberOfSecondsPerRound: minNumberOfSecondsPerRound,
            lastWinnerAddress: newAddress(0, 0),
            startedAt: now(),
        };

        self.maxNumberOfAdressesPerRound = maxNumberOfAdressesPerRound;
        self.lotteryTicketPrice = lotteryTicketPrice;
        self.percentPayToWinner = percentPayToWinner;
    }

    fun initNewLotteryRound() {
        self.numberOfFinishedLotteryRounds += 1;
        self.lotteryRound.init();
    }

    fun playInCurrentRound() {
        require(!self.stopped, "Lottery is stopped now. Please, come later");
        require(context().value == self.lotteryTicketPrice, "Incorrect TON amount to play in lottery");
        require(self.lotteryRound.amount <= self.maxNumberOfAdressesPerRound, "No space for new user in current lottery round, please, wait");

        self.lotteryRound.add(sender());
    }

    fun payoutInCurrentRound() {
        require(self.lotteryRound.canMakePayout(), "Current lottery round cannot be completed yet");

        let valuePayToWinner: Int = self.lotteryTicketPrice;
        if (!self.lotteryRound.onlyOneAddress()) {
            valuePayToWinner = (self.lotteryRound.amount - 1) * self.lotteryTicketPrice * self.percentPayToWinner / 100;
        }
        valuePayToWinner -= self.Comission;

        let winnerAddress: Address = self.lotteryRound.getWinner();

        // Make payout to winner
        send(SendParameters{
            to: winnerAddress,
            value: valuePayToWinner,
            mode: SendIgnoreErrors,
            body: "Congratulations! You win!".asComment(),
        });

        self.initNewLotteryRound();
    }

    receive() {
        self.playInCurrentRound();
    }

    receive("play") {
        self.playInCurrentRound();
    }

    receive("payout") {
        self.requireOwner();

        self.payoutInCurrentRound();
    }

    get fun version(): String {
        return self.Version;
    }

    get fun balance(): Int {
        return myBalance(); // current contract balance in nano-tons
    }

    get fun numberOfFinishedLotteryRounds(): Int {
        return self.numberOfFinishedLotteryRounds;
    }

    get fun maxNumberOfAdressesPerRound(): Int {
        return self.maxNumberOfAdressesPerRound;
    }

    get fun lotteryTicketPrice(): Int {
        return self.lotteryTicketPrice;
    }

    get fun percentPayToWinner(): Int {
        return self.percentPayToWinner;
    }

    get fun lotteryRound(): LotteryRound {
        return self.lotteryRound;
    }
}
