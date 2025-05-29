import { ColumnsType } from 'antd/es/table';
import { Button, Form, Table, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import JSONDataModal from '../JSONDataModal';
import NestedForm from './NestedForm';
import { DisplayTableProps } from '../../utils/form/FormUtils';
import {
  handleAddNestedObject,
  handleDeleteNestedObject,
} from '../../utils/form/FormUtils';

/* eslint-disable  @typescript-eslint/no-explicit-any */

const DisplayTable = <T extends { metadata?: any }>({
  columns,
  deleteWidth,
  parentForm,
  fieldLabel,
  tooltipTitle,
  formLabel,
  formProps: {
    existingObjects,
    existingLabels,
    formItems,
    formTitle,
    parseFields,
    parseObject,
  },
}: DisplayTableProps<T>) => {
  const [objectData, setObjectData] = useState<T[]>([]);
  const [showObjectModal, setShowObjectModal] = useState<boolean>(false);
  const [showJSONModal, setShowJSONModal] = useState<boolean>(false);
  const [JSONData, setJSONData] = useState<T>();

  useEffect(() => {
    setObjectData(parentForm.getFieldValue([fieldLabel]) || []);
  }, [parentForm, fieldLabel]);

  const handleAddObject = (object: T) => {
    setObjectData(
      handleAddNestedObject(object, objectData, fieldLabel, parentForm)
    );
  };

  const tableColumns: ColumnsType<T> = [
    ...columns,
    {
      title: '',
      key: 'delete',
      width: deleteWidth ?? '10%',
      align: 'center',
      render: (record: T) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            setObjectData(
              handleDeleteNestedObject(
                record,
                objectData,
                fieldLabel,
                parentForm
              )
            );
          }}
        />
      ),
    },
  ];

  return (
    <>
      <JSONDataModal
        showModal={showJSONModal}
        closeModal={() => setShowJSONModal(false)}
        data={JSONData ?? {}}
      />
      <Form.Item
        label={
          <div className="flex flex-row items-center gap-2 pt-2">
            <Tooltip placement="topLeft" title={tooltipTitle}>
              {formLabel}
            </Tooltip>
            <Button
              icon={<PlusOutlined />}
              onClick={() => setShowObjectModal(true)}
              size="small"
            />
          </div>
        }
        name={fieldLabel}
      >
        <Table
          columns={tableColumns}
          dataSource={objectData}
          onRow={(record) => ({
            onClick: () => {
              setJSONData(record);
              setShowJSONModal(true);
            },
            className: 'hover:cursor-pointer',
          })}
        />
      </Form.Item>
      <NestedForm<T>
        showModal={showObjectModal}
        closeModal={() => setShowObjectModal(false)}
        addObject={handleAddObject}
        objectData={objectData}
        existingObjects={existingObjects}
        existingLabels={existingLabels}
        formItems={formItems}
        formTitle={formTitle}
        parseFields={parseFields}
        parseObject={parseObject}
      />
    </>
  );
};

export default DisplayTable;
