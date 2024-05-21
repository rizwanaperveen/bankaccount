#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.bgBlue("\t********************************************"));
console.log(chalk.bgBlue("***************WELCOME TO BANK ACCOUNT****************"));
console.log(chalk.bgBlue("\t********************************************"));
//bankaccount interface
interface BankAccount{
  bankaccountnumber: number;
  accountBalance : number;
  withdraw(amount:number):void
  deposit(amount:number):void
  checkbalance():void
}
//bankaccount class
class bankaccount implements BankAccount{
  bankaccountnumber: number;
  accountBalance : number;

  constructor(bankaccountnumber: number,accountBalance : number){
   this. bankaccountnumber = bankaccountnumber;
  this.accountBalance = accountBalance;
  }

  //debit  means withdraw some amount

  withdraw(amount:number):void{
  if(this.accountBalance >= amount){
    this.accountBalance -= amount;
    console.log(chalk.bgGreenBright(`withdraw amount $${amount} successfully,your remaining balance is: $${this.accountBalance}`));
  }else{
    console.log(chalk.bgRedBright("Insufficient balance!"));
    }    
  }

  //credit means to deposit some amount

  deposit(amount:number):void{
    if(amount > 100){
      amount -= 1   // $1 to be charged if more than $100 is deposited
}this.accountBalance += amount;
console.log(chalk.bgMagenta(`deposit $${amount} successfully, your total balance is: $${this.accountBalance}`));
}

// checkbalance

checkbalance():void{
  console.log(chalk.bgCyan(`currentbalance is: $${this.accountBalance}`));
}
}

// create customer class

class Customer{
  firstName : string;
  lastName : string;
  gender : string;
  age : number;
  mobileNumber : number;
  account : bankaccount;

  constructor(firstName : string,lastName : string,gender : string,age : number,mobileNumber : number,account : bankaccount){
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.account = account;
  }
}

//create bank account

const accounts : bankaccount[]= [
  new bankaccount (1234,600),
  new bankaccount (4567,800),
  new bankaccount (6789,1000) 
];

//create customer 

const customers: Customer[] = [
  new Customer("Syed","Hamzah","Male",30,3123456789,accounts[0]),
  new Customer("Syeda","Rabia","Female",20,3123456689,accounts[1]),
  new Customer("Amjad","Malik","Male",35,3123876789,accounts[2])
];

//function interact bankaccount

async function action(){
  do{
    const accountNuminput = await inquirer.prompt(
      {
        name : "accountNumber",
        type : "number",
        message : "Enter your account number!"
      }
    );
    const customer = customers.find(customer => customer.account.bankaccountnumber === accountNuminput.accountNumber)
  if(customer){
  console.log(chalk.bgGreenBright(`Welcome, ${customer.firstName} ${customer.lastName}!\n`));
   const ans = await inquirer.prompt([
    {
      name : "select",
      type : "list",
      choices : ["Deposit","Withdraw","Check Balance","Exit"],
      message : "select an operation"
   }
  ]); 
switch(ans.select){
 case "Deposit":
  const depositAmount = await inquirer.prompt({
    name : "amount",
    type : "number",
    message : " enter the amount to deposit:"
  });
  customer.account.deposit(depositAmount.amount);
  break;
  case "Withdraw":
  const withdrawAmount = await inquirer.prompt({
    name : "amount",
    type : "number",
    message : " enter the amount to withdraw:"
  });
  customer.account.withdraw(withdrawAmount.amount);
  break;
  case "Check Balance":
    customer.account.checkbalance();
    break; 
  case "Exit":
    console.log(chalk.bgBlueBright("Exiting the program"));
    console.log(chalk.bgBlueBright("\n Thank you for using bank service."));
    return;
    }
}else{
  console.log(chalk.bgRedBright("Invalid account number! please enter a valid number."));
  }
}while(true)
}
action();