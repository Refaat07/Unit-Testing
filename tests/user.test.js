const it = require("ava").default;
const chai = require("chai");
var expect = chai.expect;
const startDB = require('../helpers/DB');
const { MongoMemoryServer } = require('mongodb-memory-server');

require('dotenv').config()
const { addUser, getAllUsers, getSingleUser, getDeleteUser } = require('../helpers/controllers');
const User = require('../models/user');
const sinon = require("sinon");
const utils = require('../helpers/utils')
// it.before(async (t)=>{
//     t.context.mongod = await MongoMemoryServer.create();
//      process.env.MONGOURI = t.context.mongod.getUri('cloudUnitTesting');
//     await startDB();
// }

// );

// it.after(async (t)=>{
//  await t.context.mongod.stop({doCleanUp: true});
// })
// it("create use succesfully", async (t) => {
//   // setup
//   const request = {
//     body: {
//       firstName: "Menna",
//       lastName: "Hamdy",
//       age: 11,
//       job: "fs",
//     },
//   };
//   const expectedResult = {
//     fullName: "Menna Hamdy",
//     age: 11,
//     job: "fs",
//   };
// //   sinon.stub(utils, 'getFullName').returns('Menna Hamdy');
//   sinon.stub(utils, 'getFullName').callsFake((fname, lname)=>{
//     expect(fname).to.be.equal(request.body.firstName);
//     expect(lname).to.be.equal(request.body.lastName);
//     return 'Menna Hamdy'
//   })
//   const actualResult = await addUser(request);
//   const result = {
//     ...expectedResult,
//     __v: actualResult.__v,
//     _id: actualResult._id
//   }
//   expect(actualResult).to.be.a('object');
//   expect(actualResult._doc).to.deep.equal(result);
//   t.teardown(async ()=>{
//     await User.deleteMany({
//         fullName: request.body.fullName,
//     })
//   })
//   t.pass();
// });


// Retrieve all users

// // Setup and teardown functions
// const setupTestEnvironment = async (t) => {
//   t.context.mongod = await MongoMemoryServer.create()
//   process.env.MONGOURI = t.context.mongod.getUri('cloudUnitTesting')
//   await startDB()
// };

// const teardownTestEnvironment = async (t) => {
//   await t.context.mongod.stop({ doCleanUp: true })
// };

// const teardownUserData = async (t) => {
//   await User.deleteMany({});
// };

// // Test cases
// before(async (t) => {
//   await setupTestEnvironment(t)
// });

// after(async (t) => {
//   await teardownTestEnvironment(t)
// });

// it("Should successfully retrieve all users", async (t) => {
//   // Setup
//   const user1 = new User({ fullName: 'MRefaat', age: 27, job: 'DevOps' })
//   await user1.save()

//   const request = {}
//   const actualResult = await getAllUsers(request)

//   // Assertions
//   t.deepEqual(actualResult, [user1], 'Returned users should match the created user')
// });

// // Teardown for user data cleanup
// it.afterEach(teardownUserData)


// Retrieve a single user

// // Setup and teardown functions
// const setupTestEnvironment = async (t) => {
//   t.context.mongod = await MongoMemoryServer.create()
//   process.env.MONGOURI = t.context.mongod.getUri('cloudUnitTesting')
//   await startDB()
// };

// const teardownTestEnvironment = async (t) => {
//   await t.context.mongod.stop({ doCleanUp: true })
// };

// const teardownUserData = async (t) => {
//   await User.deleteMany({})
// };

// // Test cases
// before(async (t) => {
//   await setupTestEnvironment(t)
// });

// after(async (t) => {
//   await teardownTestEnvironment(t)
// });

// it("Should successfully retrieve the user", async (t) => {
//   // Setup
//   const user = new User({ fullName: 'Mohamed', age: 27, job: 'DevOps' })
//   await user.save()

//   const request = {
//     params: { id: user._id.toString() } 
//   };

//   // Action
//   const actualResult = await getSingleUser(request)

//   // Assertions
//   t.is(actualResult.constructor.name, 'User', 'Returned result should be an instance of User')
//   t.is(actualResult._id.toString(), user._id.toString(), 'Returned user ID should match the created user ID')
// });

// // Teardown for user data cleanup
// it.afterEach(teardownUserData)


// Delete a user
// Setup and teardown functions
const setupTestEnvironment = async (t) => {
  t.context.mongod = await MongoMemoryServer.create()
  process.env.MONGOURI = t.context.mongod.getUri('cloudUnitTesting')
  await startDB()
};

const teardownTestEnvironment = async (t) => {
  await t.context.mongod.stop({ doCleanUp: true })
};

const teardownUserData = async (t) => {
  await User.deleteMany({})
};

// Test cases
before(async (t) => {
  await setupTestEnvironment(t)
});

after(async (t) => {
  await teardownTestEnvironment(t)
});

it("should delete a single user successfully", async (t) => {
  // Setup
  const user = new User({ fullName: 'MRefaat', age: 27, job: 'DevOps' })
  await user.save()

  const request = {
    params: { id: user._id.toString() } 
  };

  // Action
  const actualResult = await getDeleteUser(request)

  // Assertions
  t.is(actualResult.constructor.name, 'Object', 'Returned result should be an object')
  t.true(actualResult.success, 'Deletion should be successful')
  t.is(actualResult.deleted, 1, 'One user should be deleted')

  const deletedUser = await User.findById(user._id);
  t.is(deletedUser, null, 'Deleted user should not exist in the database')
});

// Teardown for user data cleanup
it.afterEach(teardownUserData)


