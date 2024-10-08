const assert = require("assert");
const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile"); 
const INITIAL_MESSAGE = "Hey There!";

let accounts;
let inbox;

beforeEach(async () => {
   accounts = await web3.eth.getAccounts();

   inbox = await new web3.eth.Contract(JSON.parse(interface))
   .deploy({data: bytecode, arguments: [INITIAL_MESSAGE]})
   .send({ from: accounts[0], gas: "1000000" })
})

describe("Inbox", () => {
    it("deploys a contract", () => {
        assert.ok(inbox.options.address);
    });

    it("has a default message", async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MESSAGE);
    })

    it("can change message", async () => {
        await inbox.methods.setMessage("Bye!").send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, "Bye!");
    })
});