import Logo from './Logo';


export default class Header extends React.Component {
    render() {
        return (<div id='header' style={{
            background: 'black',
        }}>
            <Logo />
            <span style={{
                verticalAlign: 'top',
                fontSize: '250%',
                padding: '0.5em',
                //fontWeight: 'bold',
            }}>Dashboard</span>
        </div>);
    }
}
