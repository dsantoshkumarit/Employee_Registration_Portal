const EmployeeModel = require("../models/Employee");
const router = require("express").Router();

//add employee
router.post("/addEmployee", async (req, res) => {
  const {
    name,
    mobile,
    jobtype,
    preferredlocation,
    profilepicurl,
    email,
    dob,
  } = req.body;
  const employeeExists = await EmployeeModel.findOne({ email });

  if (employeeExists) {
    res.status(400).json({ message: `Employee with ${email} already exists` });
  } else {
    const newEmployee = new EmployeeModel({
      name,
      mobile,
      jobtype,
      preferredlocation,
      profilepicurl,
      email,
      dob,
    });
    await newEmployee.save();
    res.status(200).json({
      message: `Employee with email ${email} registered successfully`,
    });
  }
});

//get all employees
router.get("/getAllEmployees", async (req, res) => {
  try {
    const emplist = await EmployeeModel.find();
    res.status(200).json(emplist);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while retrieving data from database" });
  }
});

//delete emp by _id
router.delete("/deleteEmployee/:_id", async (req, res) => {
  try {
    let delemp = await EmployeeModel.findOneAndRemove({ _id: req.params._id });
    res.status(200).json({
      message: `Employee with email : ${delemp.email} is deleted successfully`,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while deleting employee from database" });
  }
});

module.exports = router;
