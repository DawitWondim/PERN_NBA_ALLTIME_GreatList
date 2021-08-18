import React, {Fragment, useState} from "react";

const CreateNewPlayer = () => {

    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [rank, setRank] = useState("");

    const onSubmitForm = async event => {
        event.preventDefault();

        try {
            const body = {name, position, rank};
            const response = await fetch("http://localhost:5000/legends", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (error) {
            console.error(error.message);
        };
    }
    return (
    <Fragment>
        <h1 className="text-center mt-5">Pern NBA AllTime Greatest List</h1>
        <form className = "d-flex mt-5" onSubmit = {onSubmitForm}>
            <input type = "text" className = "form-control" 
            value = {name} onChange = {event => setName(event.target.value)}/>
            <input type = "text" className = "form-control" 
            value = {position} onChange = {event => setPosition(event.target.value)}/>
            <input type = "text" className = "form-control" 
            value = {rank} onChange = {event => setRank(event.target.value)}/>
            <button className = "btn btn-success">Add</button>
        </form>
    </Fragment>
    );
};

export default CreateNewPlayer;