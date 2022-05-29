const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Set appointment rate", function () {
  let Contract, contract;
  let owner, address1, address2;

  beforeEach(async function () {
    [owner, address1, address2] = await ethers.getSigners();

    Contract = await ethers.getContractFactory("Calend3");
    contract = await Contract.deploy();
    await contract.deployed();
  })

  it("Should set the appointment minutely rate", async function () {
    const transaction = await contract.setAppointmentRate(1000);
    await transaction.wait();
    expect(await contract.getAppointmentRate()).to.equal(1000);
  });

  it("Should fail if non-owner sets rate", async function () {
    await expect(
      contract.connect(address1).setAppointmentRate(500)
    ).to.be.revertedWith("Only the owner can set the rate");
  });

  it("Should create two appointments", async function () {
    const setRate = await contract.setAppointmentRate(ethers.utils.parseEther("0.001"));
    await setRate.wait();

    const firstTransaction = await contract.connect(address1).createAppointment("Meet first in the morning", 1644143400, 1644150600, { value: ethers.utils.parseEther("2") });
    await firstTransaction.wait();

    const secondTransaction = await contract.connect(address2).createAppointment("Meet again in the afternoon", 1644154200, 1644159600, { value: ethers.utils.parseEther("1.5") });
    await secondTransaction.wait();

    const appointments = await contract.getAppointments();
    expect(appointments.length).to.equal(2);

    const ownerBalance = await ethers.provider.getBalance(owner.address);
    const addr1Balance = await ethers.provider.getBalance(address1.address);
    const addr2Balance = await ethers.provider.getBalance(address2.address);

    console.log(ownerBalance.toBigInt());
    console.log(addr1Balance.toBigInt());
    console.log(addr2Balance.toBigInt());
  });
});
