import { useDispatch, useSelector } from 'react-redux'
import { filterContent } from '../reducers/filterReducer'

const Filter = () => {

    const dispatch = useDispatch()
    const filtered = useSelector(state => state.filter)
   // console.log(filtered)

    const handleChange = (event) => {
        event.preventDefault()
        const content = event.target.value
       // event.target.anecdote.value = ''
        dispatch(filterContent(content))
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input  onChange={handleChange} />
        </div>
    )
}

export default Filter