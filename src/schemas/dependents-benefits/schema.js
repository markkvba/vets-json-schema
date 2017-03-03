import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import constants from '../../common/constants';
import _ from 'lodash';

let definitions = _.cloneDeep(originalDefinitions);
definitions.educationType.enum.push('farmCoop');

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: "DEPENDENTS' APPLICATION FOR VA EDUCATION BENEFITS",
  type: 'object',
  additionalProperties: false,
  definitions: _.pick(definitions, [
    'dateRange',
    'educationType'
  ]),
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    serviceBranch: {
      type: 'string'
    },
    currentlyActiveDuty: {
      type: 'boolean'
    },
    outstandingFelony: {
      type: 'boolean'
    },
    restorativeTraining: {
      type: 'boolean'
    },
    vocationalTraining: {
      type: 'boolean'
    },
    trainingState: {
      enum: constants.usaStates
    },
    educationObjective: {
      type: 'string'
    },
    educationalCounseling: {
      type: 'boolean'
    },
    spouseInfo: {
      type: 'object',
      properties: {
        divorcePending: {
          type: 'boolean'
        },
        remarried: {
          type: 'boolean'
        }
      }
    },
    benefit: {
      type: 'string',
      enum: ['chapter35', 'chapter33']
    },
    previousBenefits: {
      type: 'object',
      properties: {
        disability: {
          type: 'boolean'
        },
        dic: {
          type: 'boolean'
        },
        chapter31: {
          type: 'boolean'
        },
        ownServiceBenefits: {
          type: 'string'
        },
        chapter35: {
          type: 'boolean'
        },
        chapter33: {
          type: 'boolean'
        },
        transferOfEntitlement: {
          type: 'boolean'
        },
        other: {
          type: 'string'
        }
      }
    },
    highSchool: {
      type: 'object',
      properties: _.merge(
        _.omit(definitions.postHighSchoolTrainings.items.properties, 'major'),
        {
          status: {
            type: 'string',
            enum: ['graduated', 'discontinued', 'graduationExpected', 'ged', 'neverAttended']
          }
        }
      )
    },
    civilianBenefitsAssistance: {
      type: 'boolean'
    },
    civilianBenefitsSource: {
      type: 'string'
    },
    remarks: {
      type: 'string'
    },
    educationProgram: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        address: schemaHelpers.getDefinition('address'),
        educationType: schemaHelpers.getDefinition('educationType')
      }
    },
    eduBenefitsPamphlet: {
      type: 'boolean'
    }
  },
  required: ['privacyAgreementAccepted']
};

[
  ['privacyAgreementAccepted'],
  ['ssn', 'relativeSocialSecurityNumber'],
  ['gender'],
  ['date', 'relativeDateOfBirth'],
  ['fullName', 'relativeFullName'],
  ['address', 'relativeAddress'],
  ['phone', 'homePhone'],
  ['phone', 'mobilePhone'],
  ['bankAccount'],
  ['secondaryContact'],
  ['fullName', 'veteranFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['vaFileNumber'],
  ['date', 'veteranDateOfBirth'],
  ['date', 'veteranDateOfDeath'],
  ['date', 'educationStartDate'],
  ['relationship'],
  ['date', 'spouseInfo.remarriageDate'],
  ['date', 'benefitsRelinquishedDate'],
  ['fullName', 'previousBenefits.veteranFullName'],
  ['ssn', 'previousBenefits.veteranSocialSecurityNumber'],
  ['toursOfDuty'],
  ['date', 'highSchool.highSchoolOrGedCompletionDate'],
  ['postHighSchoolTrainings'],
  ['nonMilitaryJobs']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;
