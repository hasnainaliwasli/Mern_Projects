import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';


const AllTypes = {
  INPUT: "input",
  SELECT: "select",
  TAREA: "textarea"
}

export default function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText }) {

  const renderInputsByComponentType = (getControllItem) => {
    let element = null;
    const value = formData[getControllItem.name] || '';
    switch (getControllItem.componentType) {
      case AllTypes.INPUT:
        element = <Input
          name={getControllItem.name}
          placeholder={getControllItem.placeholder}
          id={getControllItem.name}
          type={getControllItem.type}
          value={value}
          onChange={(event) => setFormData({
            ...formData,
            [getControllItem.name]: event.target.value
          })}
        />

        break;

      case AllTypes.SELECT:
        element = <Select value={value}
        onValueChange= {(value)=>setFormData({
          ...formData,
          [getControllItem.name]: value
        })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={getControllItem.placeholder}>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {
              getControllItem.options && getControllItem.options.length > 0 ? getControllItem.map(optionItem => <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem}</SelectItem>) : null
            }
          </SelectContent>
        </Select>
        break;
      case AllTypes.TAREA:
        element = <Textarea
          name={getControllItem.name}
          placeholder={getControllItem.placeholder}
          id={getControllItem.id}
          value={value}
          onChange={(event) => setFormData({
            ...formData,
            [getControllItem.name]: event.target.value
          })}
        >
        </Textarea>
        break;
      default:
        element = <Input
          name={getControllItem.name}
          placeholder={getControllItem.placeholder}
          id={getControllItem.name}
          type={getControllItem.type}
          value={value}
          onChange={(event) => setFormData({
            ...formData,
            [getControllItem.name]: event.target.value
          })}
        />
        break;
    }
    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col gap-3'>
        {
          formControls.map((controlItem) => <div className='grid w-full gap-1.5' key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {
              {
                renderInputsByComponentType(controlItem)
              }
            }
          </div>)
        }
      </div>

      <Button className="mt-2 w-full" type="submit" >{buttonText || "Submit"}</Button>
    </form>
  )
}
