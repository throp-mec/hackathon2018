import * as Tiles from './tiles/Tiles.jsx';


export default class Tile extends React.Component {
    constructor(props) {
        super(props);

        this.tileMap = {
            'api-info': Tiles.Contents_ApiInfo,
            'current-sre': Tiles.Contents_CurrentSre,
            'new-relic': Tiles.Contents_NewRelic,
            'mecca': Tiles.Contents_Mecca,
            'new-relic-throughput': Tiles.Contents_NewRelicThroughput,
            'new-relic-error': Tiles.Contents_NewRelicError,
            'production-links': Tiles.Contents_ProductionLinks,
            'imgix-bandwidth': Tiles.Contents_ImigixBandwidth,
            'db-and-mq-status': Tiles.Contents_DatabaseAndMqPing,
        };
    }

    render() {
        return <div className='tile' style={{
            background: '#333',
            display: 'inline-block',
            flexGrow: 1,
            order: this.props.order,
            marginTop: '0.3em',
            marginLeft: '0.3em',
            boxShadow: 'rgba(0,0,0,0.6) 0px 0px 10px',
        }}>
            <div className='title' style={{
                margin: 0,
                background: 'rgba(255,255,255,0.1)',
                fontSize: '120%',
            }}>
                <div style={{
                    display: 'inline-block',
                    paddingRight: '1em',
                    paddingLeft: '1em',
                }}>
                    {this.props.title}
                </div>
                <div style={{
                        float: 'right',
                        height: '100%',
                        cursor: 'pointer',
                    }}>
                    <span onClick={() => {
                        this.props.onForward(this.props.id);
                    }}>
                        <i className="fas fa-angle-left"></i>
                    </span>
                    <span onClick={() => {
                        this.props.onBackward(this.props.id);
                    }}>
                        <i className="fas fa-angle-right"></i>
                    </span>
                </div>
            </div>
            <div className='contents' style={{
                color: '#DDD',
                fontSize: '95%',
            }}>{
                this.tileMap[this.props.id] ?
                    React.createElement(this.tileMap[this.props.id], this.props.data, null)
                    : <span>No renderer for "{this.props.id}"</span>
            }</div>
        </div>
    }
}
