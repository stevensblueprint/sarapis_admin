import { TableProps } from 'antd';
import RequiredDocument from '../interface/model/RequiredDocument';

export const documentTypeOptions = [
  { value: 'proofOfIncome', label: 'Proof of Income' },
  { value: 'utilityBill', label: 'Utility Bill' },
  { value: 'proofOfSpouseDependents', label: 'Proof of Spouse/Dependents' },
  { value: 'application', label: 'Application' },
  { value: 'proofOfAddress', label: 'Proof of Address' },
  { value: 'highSchoolDiploma', label: 'High School Diploma' },
  { value: 'photoID', label: 'Photo ID' },
  { value: 'proofOfHardship', label: 'Proof of Hardship' },
  { value: 'prescription', label: 'Prescription' },
  { value: 'proofOfFinancialCrisis', label: 'Proof of Financial Crisis' },
  { value: 'birthCertificate', label: 'Birth Certificate' },
  { value: 'evictionNotice', label: 'Eviction Notice' },
  { value: 'referral', label: 'Referral' },
  {
    value: 'mailPostmarkedWithin2Months',
    label: 'Mail Postmarked Within 2 Months',
  },
  { value: 'GED', label: 'GED' },
  { value: 'documentedHIVTestResults', label: 'Documented HIV Test Results' },
  { value: 'medicalVerification', label: 'Medical Verification' },
  {
    value: 'documentationFromFamilyMember',
    label: 'Documentation from Family Member',
  },
  { value: 'proofOfInsurance', label: 'Proof of Insurance' },
  {
    value: 'immigrationRefugeeAsylumStatus',
    label: 'Immigration/Refugee/Asylum Status',
  },
];

export const requiredDocumentsTableColumns: TableProps<RequiredDocument>['columns'] =
  [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
  ];
