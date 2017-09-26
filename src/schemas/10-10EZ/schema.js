import constants from '../../common/constants';
import _ from 'lodash';
import schemaHelpers from '../../common/schema-helpers';

const states = _.uniq(_.flatten(_.values(constants.states)).map(object => object.value));
const countries = constants.countries.map(object => object.value);
const countriesWithAnyState = Object.keys(constants.states).filter(x => _.includes(countries, x));
const countryStateProperites = _.map(constants.states, (value, key) => ({
  properties: {
    country: {
      type: 'string',
      'enum': [key]
    },
    state: {
      type: 'string',
      'enum': value.map(x => x.value)
    },
    zipcode: {
      type: 'string',
      maxLength: 50
    }
  }
}));
countryStateProperites.push(
  {
    properties: {
      country: {
        not: {
          type: 'string',
          'enum': countriesWithAnyState
        }
      },
      provinceCode: {
        type: 'string',
        maxLength: 51
      },
      postalCode: {
        type: 'string',
        maxLength: 51
      },
    },
  });

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR HEALTH BENEFITS (10-10EZ)',
  definitions: {
    address: {
      type: 'object',
      oneOf: countryStateProperites,
      properties: {
        street: {
          type: 'string',
          minLength: 1,
          maxLength: 50
        },
        street2: {
          type: 'string',
          maxLength: 50
        },
        street3: {
          type: 'string',
          maxLength: 50
        },
        city: {
          type: 'string',
          minLength: 1,
          maxLength: 51
        }
      },
      required: [
        'street',
        'city',
        'country'
      ]
    },
    child: {
      type: 'object',
      properties: {
        childFullName: {
          $ref: '#/definitions/fullName'
        },
        childRelation: {
          'enum': constants.dependentRelationships,
          type: 'string',
        },
        childSocialSecurityNumber: {
          $ref: '#/definitions/ssn'
        },
        childBecameDependent: {
          $ref: '#/definitions/date'
        },
        childDateOfBirth: {
          $ref: '#/definitions/date'
        },
        childDisabledBefore18: {
          type: 'boolean'
        },
        childAttendedSchoolLastYear: {
          type: 'boolean'
        },
        childEducationExpenses: {
          $ref: '#/definitions/monetaryValue'
        },
        childCohabitedLastYear: {
          type: 'boolean'
        },
        childReceivedSupportLastYear: {
          type: 'boolean'
        },
        grossIncome: {
          $ref: '#/definitions/monetaryValue'
        },
        netIncome: {
          $ref: '#/definitions/monetaryValue'
        },
        otherIncome: {
          $ref: '#/definitions/monetaryValue'
        },
      }
    },
    dependent: {
      type: 'object',
      properties: {
        fullName: {
          $ref: '#/definitions/fullName'
        },
        relation: {
          'enum': constants.dependentRelationships,
          type: 'string',
        },
        socialSecurityNumber: {
          $ref: '#/definitions/ssn'
        },
        becameDependent: {
          $ref: '#/definitions/date'
        },
        dateOfBirth: {
          $ref: '#/definitions/date'
        },
        disabledBefore18: {
          type: 'boolean'
        },
        attendedSchoolLastYear: {
          type: 'boolean'
        },
        educationExpenses: {
          $ref: '#/definitions/monetaryValue'
        },
        cohabitedLastYear: {
          type: 'boolean'
        },
        receivedSupportLastYear: {
          type: 'boolean'
        },
        grossIncome: {
          $ref: '#/definitions/monetaryValue'
        },
        netIncome: {
          $ref: '#/definitions/monetaryValue'
        },
        otherIncome: {
          $ref: '#/definitions/monetaryValue'
        },
      }
    },
    date: {
      format: 'date',
      type: 'string'
    },
    fullName: {
      type: 'object',
      properties: {
        first: {
          type: 'string',
          minLength: 1,
          maxLength: 30
        },
        middle: {
          type: 'string'
        },
        last: {
          type: 'string',
          minLength: 2,
          maxLength: 30
        },
        suffix: {
          type: 'string',
          'enum': constants.suffixes
        },
      },
      required: [
        'first',
        'last'
      ]
    },
    monetaryValue: {
      type: 'number',
      minimum: 0,
      maximum: 9999999.99,
    },
    phone: {
      type: 'string',
      pattern: '^[0-9]{10}$'
    },
    provider: {
      type: 'object',
      properties: {
        insuranceName: {
          type: 'string',
          maxLength: 100
        },
        insurancePolicyHolderName: {
          type: 'string',
          maxLength: 50
        },
        insurancePolicyNumber: {
          type: 'string',
          maxLength: 30
        },
        insuranceGroupCode: {
          type: 'string',
          maxLength: 30
        },
      },
    },
    ssn: {
      oneOf: [
        {
          type: 'string',
          pattern: '^[0-9]{9}$'
        }, {
          type: 'string',
          pattern: '^[0-9]{3}-[0-9]{2}-[0-9]{4}$'
        }
      ]
    },
  },
  type: 'object',
  properties: {
    veteranFullName: {
      $ref: '#/definitions/fullName'
    },
    //  Revisit how to validate that this is either empty or a string between 2 and 35 characters
    mothersMaidenName: {
      type: 'string'
    },
    veteranSocialSecurityNumber: {
      $ref: '#/definitions/ssn'
    },
    gender: {
      type: 'string',
      'enum': constants.genders.map(option => option.value)
    },
    cityOfBirth: {
      type: 'string',
      minLength: 2,
      maxLength: 20
    },
    stateOfBirth: {
      type: 'string',
      'enum': states.concat(['Other'])
    },
    veteranDateOfBirth: {
      $ref: '#/definitions/date'
    },
    maritalStatus: {
      type: 'string',
      'enum': constants.maritalStatuses
    },
    isVaServiceConnected: {
      type: 'boolean'
    },
    compensableVaServiceConnected: {
      type: 'boolean'
    },
    receivesVaPension: {
      type: 'boolean'
    },
    isEssentialAcaCoverage: {
      type: 'boolean'
    },
    vaMedicalFacility: {
      type: 'string',
      'enum': _.flatten(_.values(constants.vaMedicalFacilities)).map(object => object.value)
    },
    wantsInitialVaContact: {
      type: 'boolean'
    },
    isSpanishHispanicLatino: {
      type: 'boolean'
    },
    isAmericanIndianOrAlaskanNative: {
      type: 'boolean'
    },
    isBlackOrAfricanAmerican: {
      type: 'boolean'
    },
    isNativeHawaiianOrOtherPacificIslander: {
      type: 'boolean'
    },
    isAsian: {
      type: 'boolean'
    },
    isWhite: {
      type: 'boolean'
    },
    veteranAddress: {
      $ref: '#/definitions/address'
    },
    email: {
      type: 'string',
      // regex from client/validations.js' isValidEmail, with some extra escaping
      pattern: '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
    },
    homePhone: {
      $ref: '#/definitions/phone'
    },
    mobilePhone: {
      $ref: '#/definitions/phone'
    },
    discloseFinancialInformation: {
      type: 'boolean'
    },
    spouseFullName: {
      $ref: '#/definitions/fullName'
    },
    spouseSocialSecurityNumber: {
      $ref: '#/definitions/ssn'
    },
    spouseDateOfBirth: {
      $ref: '#/definitions/date'
    },
    dateOfMarriage: {
      $ref: '#/definitions/date'
    },
    sameAddress: {
      type: 'boolean'
    },
    cohabitedLastYear: {
      type: 'boolean'
    },
    provideSupportLastYear: {
      type: 'boolean'
    },
    spouseAddress: {
      $ref: '#/definitions/address'
    },
    spousePhone: {
      $ref: '#/definitions/phone'
    },
    children: {
      type: 'array',
      items: {
        $ref: '#/definitions/dependent'
      },
    },
    dependents: {
      type: 'array',
      items: {
        $ref: '#/definitions/dependent'
      },
    },
    veteranGrossIncome: {
      $ref: '#/definitions/monetaryValue'
    },
    veteranNetIncome: {
      $ref: '#/definitions/monetaryValue'
    },
    veteranOtherIncome: {
      $ref: '#/definitions/monetaryValue'
    },
    spouseGrossIncome: {
      $ref: '#/definitions/monetaryValue'
    },
    spouseNetIncome: {
      $ref: '#/definitions/monetaryValue'
    },
    spouseOtherIncome: {
      $ref: '#/definitions/monetaryValue'
    },
    deductibleMedicalExpenses: {
      $ref: '#/definitions/monetaryValue'
    },
    deductibleFuneralExpenses: {
      $ref: '#/definitions/monetaryValue'
    },
    deductibleEducationExpenses: {
      $ref: '#/definitions/monetaryValue'
    },
    isCoveredByHealthInsurance: {
      type: 'boolean'
    },
    providers: {
      type: 'array',
      items: {
        $ref: '#/definitions/provider'
      },
    },
    isMedicaidEligible: {
      type: 'boolean'
    },
    isEnrolledMedicarePartA: {
      type: 'boolean'
    },
    medicarePartAEffectiveDate: {
      $ref: '#/definitions/date'
    },
    lastServiceBranch: {
      type: 'string',
      'enum': constants.branchesServed.map(option => option.value)
    },
    lastEntryDate: {
      $ref: '#/definitions/date'
    },
    lastDischargeDate: {
      $ref: '#/definitions/date'
    },
    dischargeType: {
      type: 'string',
      'enum': constants.dischargeTypes.map(option => option.value)
    },
    purpleHeartRecipient: {
      type: 'boolean'
    },
    isFormerPow: {
      type: 'boolean'
    },
    postNov111998Combat: {
      type: 'boolean'
    },
    disabledInLineOfDuty: {
      type: 'boolean'
    },
    swAsiaCombat: {
      type: 'boolean'
    },
    vietnamService: {
      type: 'boolean'
    },
    exposedToRadiation: {
      type: 'boolean'
    },
    radiumTreatments: {
      type: 'boolean'
    },
    campLejeune: {
      type: 'boolean'
    },
    privacyAgreementAccepted: {
      type: "boolean",
      enum: [true]
    }
  },
  required: [
    'privacyAgreementAccepted',
    'veteranFullName',
    'veteranSocialSecurityNumber',
    'veteranDateOfBirth',
    'gender',
    'maritalStatus',
    'vaMedicalFacility',
    'isSpanishHispanicLatino',
    'veteranAddress',
    'isMedicaidEligible',
    'isEnrolledMedicarePartA',
    'lastServiceBranch',
    'lastEntryDate',
    'lastDischargeDate',
    'dischargeType'
  ]
};

[
  ['maritalStatus']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});


export default schema;
