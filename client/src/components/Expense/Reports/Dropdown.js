import { useDispatch } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { updateYear } from '../../../features/selectedYear/selectedYearSlice'

const yearOptions = [
  { key: '2020', text: '2020', value: '2020' },
  { key: '2021', text: '2021', value: '2021' },
  { key: '2022', text: '2022', value: '2022' },
  { key: '2023', text: '2023', value: '2023' },

]

const DropdownExampleSearchDropdown = () => {
    const dispatch = useDispatch()

    const handleOptionChange = (e, data) => {
        dispatch(updateYear(data.value))
    }

    return (
    <Dropdown
        button
        className='icon'
        floating
        labeled
        icon='calendar'
        options={yearOptions}
        search
        text='Filter'
        onChange={handleOptionChange}
    />
    )
}

export default DropdownExampleSearchDropdown