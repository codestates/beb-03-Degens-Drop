import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from 'reactstrap';

const Search = () => {
    const history = useHistory();
    const [input, setInput] = useState("");
    const onChangeHandler = (e) => {
        setInput(e.target.value);
    }
    const onKeyPressHandler = (e) => {
        console.log(e.key)
        if (e.key === 'Enter') {
            history.push(`/assets?search=${input}`);
        }
    }
    return <>
        <Input className="" placeholder='SEARCH' type='text' onChange={onChangeHandler} onKeyPress={onKeyPressHandler} value={input}></Input>
    </>
}
export default Search;