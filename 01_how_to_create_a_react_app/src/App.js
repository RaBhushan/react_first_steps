import React from "react";
import "./App.css";
import logo from "./logo.svg";

//excerise from https://www.youtube.com/watch?v=6q7sdRe1Xbo&t=2239s
const answerToQuestionOfLife = 42;
const askQuestionOfLife = () => answerToQuestionOfLife();
const Example = () => (
    <p>
        {" "}
        The answer to the utimate question in life , universe and everything is{" "}
        <strong> {answerToQuestionOfLife}</strong>.{" "}
    </p>
);

const Greeter = ({name}) => <div>Hello {name} !!</div>;

// control statements
const ClapHands = () => <span>Clapping hands ...</span>;
const DryTears = () => <span>Dry tears ...</span>;
const ShowEmotions = ({happy}) => (happy ? <ClapHands/> : <DryTears/>);

const DutchGreeter = ({name}) => <div>Hallo , {name} !</div>;
const EnglishGreeter = ({name}) => <div>Hello , {name} !</div>;
const SpanishGreeter = ({name}) => <div>Hola , {name}!</div>;

const Greet = ({lang, name}) => {
    switch (lang) {
        case "en":
        default:
            return <EnglishGreeter name={name}/>;
        case "nl":
            return <DutchGreeter name={name}/>;
        case "es":
            return <SpanishGreeter name={name}/>;
    }
};

const Ticker = ({symbol}) => <div>{symbol}</div>;
const TickerList = ({symbols}) =>
    symbols.map((sym) => <Ticker key={sym} symbol={sym}/>);

const symbols = ["AMZN", "TSLA", "MSFT", , "BRK.A", "GOOG", "FB"];

// local state inside a component
const Counter = () => {
    const [counter, setCounter] = React.useState(0);

    const increment = () => setCounter(counter + 1);
    const decrement = () => setCounter(counter - 1);

    return (
        <div>
            Counter: {counter}
            <br/>
            <button onClick={increment}> +</button>
            &nbsp;
            <button onClick={decrement}> -</button>
        </div>
    );
};

const SateGreeter = () => {
    const [name, setName] = React.useState("");
    const updateName = (e) => setName(e.target.value);
    const callback = () => alert(`Hi ${name}`);

    return (
        <div>
            <input type="text" onChange={updateName}></input>
            <br/>
            <button onClick={callback}>Greet {name}</button>
        </div>
    );
};

const checkStatus = (response) => {
    console.log(` status  code ${response.status}`)
    if (response.status >= 200 && response.status < 300) {
        console.log(`resole promise   ${response.statusText}`)
        return Promise.resolve(response);
    } else {
        return Promise.reject(`HTTP ${response.status} ${response.statusText}`);
    }
};

const parseJson = (response) => response.json();

const url = "https://official-joke-api.appspot.com/jokes/programming/random";
const getJoke = () => {
    return fetch(url)
        .then(checkStatus)
        .then(parseJson)
        .then(response => response.punchline)
};

// Joke component 
const RandomJoke = () => {
    const [{joke, loading}, setState] = React.useState({loading: true})
    const fetchRandomeJoke = async () => {
        const joke = await getJoke()
        setState({loading: false, joke})
    }
    React.useEffect(() => {
        fetchRandomeJoke()
    }, [])
    if (loading) {
        return <div>Loading...</div>
    } else {
        return <div>{joke}</div>
    }
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <Greeter name="Rahul Bhushan"/>
                {/* <ShowEmotions happy={true} /> */}
                {/* <ShowEmotions happy="false1" /> */}
                {/* <Greet lang="es" name="Rahul" /> */}
                {/* <Greet name="Rahul" lang="" /> */}
                {/* <TickerList symbols={symbols} /> */}
                {/* <Counter /> */}
                {/* <SateGreeter /> */}
                <RandomJoke/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                {/* <Example /> */}
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
