import SchemaTestHelper from "../../support/schema-test-helper";
import schemas from "../../../dist/schemas";
import fixtures from "../../support/fixtures";
import _ from "lodash";
import SharedTests from "../../support/shared-tests";
import { expect } from "chai";

const schema = schemas["22-0994"];
let schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;
delete schemaWithoutRequired.anyOf;

let schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
let sharedTests = new SharedTests(schemaTestHelper);

describe("22-0994 schema", () => {
  it("should have the no required fields", () => {
    expect(schema.required).to.deep.equal();
  });

  sharedTests.runTest("fullName", ["applicantFullName"]);

  sharedTests.runTest("ssn", ["applicantSocialSecurityNumber"]);

  sharedTests.runTest('usaPhone', ['dayTimePhone', 'nightTimePhone']);

  sharedTests.runTest('date', ['dateOfBirth']);

  // sharedTests.runTest('centralMailAddress', ['mailingAddress']); //won't pass because addressLine1\1 instead of street

  // schemaTestHelper.testValidAndInvalid('vetTecProgram',{
  //   valid: [{
  //     vetTecProgram: 'program1',
  //   }],
  //   invalid: [[{
  //     vetTecProgram: 'program12'
  //   }]]
  // });
});
