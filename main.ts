#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Define the student class
class Student {
    static counter = 1000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; //Initialize an empty array for courses
        this.balance = 100;
    }

    // Method to enroll a student in a course
    enrollCourse(course: string) {
        this.courses.push(course);
    }

    // Method to view a student balance
    view_balance() {
        console.log(chalk.italic.yellowBright(`Balance for ${this.name} : $${this.balance}`));
    }

    // Method to pay student fees
    pay_fees(amount: number) {
        this.balance -= amount;
        console.log(chalk.magentaBright(` $${amount} Fees paid Successfully for ${this.name}`));
        console.log(chalk.magentaBright(`Remaining Balance is: $${this.balance}`));
    }

    // Method to display student status
    show_status() {
        console.log(chalk.yellow(`ID ${this.id}`));
        console.log(chalk.yellow(`Name ${this.name}`));
        console.log(chalk.yellow(`Courses ${this.courses}`));
        console.log(chalk.yellow(`Balance $${this.balance}`));
    }

}
// Defining studentManager class to manage students

class studentManager {
    students: Student[]

    constructor() {
        this.students = []
    }
    // Method to add anew student
    add_student(name: string) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.green(`Student: ${name} added successfully ID: ${student.id}`));
    }
    // Method to enroll a student in a course
    enroll_student(student_id: number, course: string) {
        let student = this.find_student(student_id);
        if (student) {
            student.enrollCourse(course);
            console.log(chalk.green(`${student.name} enrolled in ${course} successfully!`))
        }
    }
    // Method to view a student Balance
    view_student_balance(student_id: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(chalk.red("Student not found! Please enter a correct student id"));
        }
    }

    // Method to pay student fees
    pay_student_fees(student_id: number, amount: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(chalk.red("Student not found! Please enter a correct student id"));
        }
    }
    // Method to display student status
    show_student_status(student_id: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
        else {
            console.log(chalk.red("Student not found! Please enter a correct student id"));
        }
    }


    //Method to find a student by student_id
    find_student(student_id: number) {
        return this.students.find(std => std.id === student_id);
    }
}

// Main function to run the program

async function main() {
    console.log(chalk.magenta(">".repeat(80)));
    console.log(chalk.yellowBright.bold.italic("\n\tWelcome to 'Qareer-ul-Ain' Student Management System\n\t"));
    console.log(chalk.magenta(">".repeat(80)));

    let student_manager = new studentManager();

    //    While loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "select an option",
                choices: ["Add student", "Enroll student", "View student Balance", "Pay Fees", "Show Status", "Exit"]
            }
        ]);
        // Using switch case statement to handle user choice
        switch (choice.choice) {
            case "Add student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name",
                    }
                ]);
                student_manager.add_student(name_input.name); //
                break;

            case "Enroll student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID..",
                    },
                    {
                        name: "Course",
                        type: "input",
                        message: "Enter a course name",
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.Course);
                break;

            case "View student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student id...",
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;

            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter an amount to pay..",
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;

            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID..",
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;

            case "Exit":
                console.log(chalk.magenta.italic("Goodbye! Thank you for using Qareer-ul-Ain Student Management System."));
                process.exit();
        }
    }
}

//  calling a main function
main();
