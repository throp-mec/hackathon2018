
import CurrentSre from './CurrentSre';
import Mecca from './Mecca';

export const Contents_CurrentSre = CurrentSre;
export const Contents_Mecca = Mecca;

export function Contents_ApiInfo(props) {
    return <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: '0.4em',
        }}>
        {props.frames.map( frame => {
            return <li key={frame.id} style={{
                padding: 0,
            }}><span style={{
                fontWeight: 'bold',
            }}>{frame.title}</span>: {frame.desc}</li>;
        })}
    </ul>;
}

export function Contents_NewRelic(props) {
    return <div>
        <iframe src="https://rpm.newrelic.com/public/charts/itRCwtFERsW"
            width="500"
            height="200"
            scrolling="no"
            frameBorder="no"></iframe>
    </div>;
}

export function Contents_NewRelicThroughput(props) {
    return <iframe src="https://rpm.newrelic.com/public/charts/kJBVzp0VqgL"
        width="500"
        height="200"
        scrolling="no"
        frameBorder="no">
    </iframe>;
}

export function Contents_NewRelicError(props) {
    return <iframe src="https://rpm.newrelic.com/public/charts/i4b8z0fSJZx"
        width="500"
        height="200"
        scrolling="no"
        frameBorder="no">
    </iframe>;
}

export function LinkButton(props) {
    const mecColour = '#0ca948';
    const linkStyle = {
        display: 'inline-block',
        background: mecColour,
        color: '#FFF',
        padding: '0.2em',
        fontWeight: 'bold',
        margin: '0.3em',
        textDecoration: 'none',
    };
    return <a style={linkStyle} href={props.url} target="_blank">
        <span style={{
            display: 'inline-block',
            padding: '0.3em',
        }}>{props.title}</span>
        <i className="fas fa-external-link-alt fa-sm"></i>
    </a>
}

export function Contents_ProductionLinks(props) {
    const links = {
        'mec.ca': 'https://www.mec.ca',
        'solr 1': 'http://10.200.163.70:8985/solr',
        'solr 2': 'http://10.200.163.71:8985/solr',
    };
    return <div>
        {Object.keys(links).map( title => {
            return <LinkButton key={title} url={links[title]} title={title}/>;
        })}
    </div>
}

export function Contents_ImigixBandwidth(props) {
    return <iframe src="https://kibana.mec.ca/app/kibana#/visualize/edit/imgix-data-slash-bandwidth-usage?embed=true&_g=()"
        height="200"
        width="500">
    </iframe>;
}

export function Contents_DatabaseAndMqPing(props) {

    const mecColour = '#0ca948';
    function getStatusIcon(val) {
        if( val === 'OK') {
            return <i style={{
                color: mecColour,
            }} className="fas fa-2x fa-check-circle"></i>;
        }
        return <i style={{
            color: '#9ca948',
        }} className="fas fa-2x fa-exclamation-circle"></i>
    }

    return <div style={{
            color: '#FFF',
        }}>
        <div style={{
                margin: '1em',
            }}>
            <i style={{
                display: 'inline-block',
                padding: 4,
            }} className="fas fa-2x fa-database"></i>
            {getStatusIcon(props.database)}
        </div>
        <div style={{
                margin: '1em',
            }}>
            <i className="fas fa-2x fa-scroll"></i>
            {getStatusIcon(props.mq)}
        </div>
    </div>;
}
