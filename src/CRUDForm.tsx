import { Button, Input, InputNumber, Select, Space, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import { Gender, Info } from "./type";
import { countries } from "./data";

interface ICRUDForm {
  addData:(newData: Info) => void
  selectData: Info | undefined
  setData: (newData: Info) => void
  delData: () => void

}

const CRUDForm: FC<ICRUDForm> = ({addData, selectData, setData, delData}) => {
  const[firstName, setFirstName] = useState("")
  const[lastName, setLastName] = useState("")
  const[gender, setGender] = useState<Gender>()
  const[country, setCountry] = useState()
  const[age, setAge] = useState<number>()
  const[salary, setSalary] = useState<number>()

  const onClickAdd = () => {
    if (firstName && lastName && gender && country && age !== undefined && salary !== undefined){
      addData({
        firstName,
        lastName,
        gender,
        country, 
        age,
        salary
      })

    } else {
      alert("Please fill all the fields")
    }
    setFirstName("");
    setLastName("");
    setGender(undefined);
    setCountry(undefined);
    setAge(undefined);
    setSalary(undefined);
  }

  const onClickUpdate = () => {
    if (firstName && lastName && gender && country && age !== undefined && salary !== undefined){
      setData({
        firstName,
        lastName,
        gender,
        country, 
        age,
        salary
      })

    } else {
      alert("Please fill all the fields")
    }
    setFirstName("");
    setLastName("");
    setGender(undefined);
    setCountry(undefined);
    setAge(undefined);
    setSalary(undefined);
  }




  return (
    <Space direction="vertical">
      <Space>
        <Typography.Text>First Name</Typography.Text>
        <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />

        <Typography.Text>Last Name</Typography.Text>
        <Input value={lastName} onChange={(e) => setLastName(e.target.value)}/>

        <Typography.Text>Gender</Typography.Text>
        <Select
          value={gender}
          onChange={(value) => setGender(value)}
          style={{ width: 150 }}
        >
          <Select.Option value={Gender.Male}>Male</Select.Option>
          <Select.Option value={Gender.Female}>Female</Select.Option>
          <Select.Option value={Gender.LGBTQIA}>LGBTQIA+</Select.Option>
        </Select>
      </Space>

      <Space>
        <Typography.Text>Country</Typography.Text>
        <Select
          options={countries.map((c) => ({
            label: `${c.value} (${c.shortValue})`,
            value: c.value,
          }))}
          style={{ width: 150 }}
          value={country}
          onChange={(value) => setCountry(value)}
        />

        <Typography.Text>Summary</Typography.Text>
        <InputNumber value={salary} onChange={(value) => setSalary(value !== null ? value : undefined)} />

        <Typography.Text>Age</Typography.Text>
        <InputNumber value={age} onChange={(value) => setAge(value !== null ? value : undefined)}/>

        <Button type="primary" onClick={onClickAdd}>Add</Button>
        <Button type="primary" onClick={onClickUpdate}>Update Selected</Button>
        <Button type="primary" danger onClick={delData}>
          Remove Selected
        </Button>
      </Space>

      <Space>
        <Input placeholder="Search..." />
      </Space>
    </Space>
  );
};

export default CRUDForm;
