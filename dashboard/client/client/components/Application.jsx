import * as Api from '../lib/Api';
import Tile from './Tile';
import Header from './Header';


const STORAGE_KEY = 'tileInfo';

export default class Application extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tiles: [],
        };

        this.onForward = this.onForward.bind(this);
        this.onBackward = this.onBackward.bind(this);
    }

    saveOrder(tiles) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tiles.map( tile => {
            return {
                id: tile.id,
                order: tile.order,
            };
        })));
        console.log('Saved order of the items');
    }

    getTileInfo(tiles) {
        let tileInfo = localStorage.getItem(STORAGE_KEY);
        if (!tileInfo) {
            tileInfo = tiles.map((tile, index) => {
                return {
                    id: tile.id,
                    order: Math.round(Math.random() * 1000), // - for testing
                    // order: index,
                };
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tileInfo));
        }
        else {
            tileInfo = JSON.parse(tileInfo);
        }
        return tiles.map( tile => {
            const info = tileInfo.find(t=> t.id === tile.id);
            return Object.assign({
                order: info ? info.order : Math.round(Math.random() * 1000),
            }, tile);
        });
    }

    componentDidMount() {
        // Set the initial state of the frames
        Api.getTiles().then( tiles => {
            // Then mix it with the state of order and appearance
            return this.setState({
                tiles: this.getTileInfo(tiles),
            });
        });
    }

    onForward(tileId) {
        this.setState(prevState => {
            const movingTile = prevState.tiles.find(t => t.id === tileId);
            const smallestTiles = prevState.tiles.filter(t => t.order < movingTile.order);
            // if there's nowhere to go, get out of here
            if( smallestTiles.length === 0 ) {
                return false;
            }
            // Sort them so the biggest is on the end of the list
            smallestTiles.sort((a, b) => {
                return b.order - a.order;
            });
            const orderToSwitch = smallestTiles[0].order;

            const newTiles = prevState.tiles.slice();

            // Set the biggest of the smallest to the new order
            newTiles.find(t => t.id === smallestTiles[0].id).order = movingTile.order;
            // Set the moved tile to the orderToSwitch
            newTiles.find(t => t.id === movingTile.id).order = orderToSwitch;

            return {
                tiles: newTiles,
            };
        });
    }

    onBackward(tileId) {
        this.setState(prevState => {
            const movingTile = prevState.tiles.find(t => t.id === tileId);
            const biggerTiles = prevState.tiles.filter(t => t.order > movingTile.order);
            // if there's nowhere to go, get out of here
            if( biggerTiles.length === 0 ) {
                return false;
            }
            // Sort them so the smallest is on the end of the list
            biggerTiles.sort((a, b) => {
                return a.order - b.order;
            });
            const orderToSwitch = biggerTiles[0].order;

            const newTiles = prevState.tiles.slice();

            // Set the biggest of the smallest to the new order
            newTiles.find(t => t.id === biggerTiles[0].id).order = movingTile.order;
            // Set the moved tile to the orderToSwitch
            newTiles.find(t => t.id === movingTile.id).order = orderToSwitch;

            this.saveOrder(newTiles);

            return {
                tiles: newTiles,
            };
        });
    }

    render() {
        return <div id="application">
            <Header />
            <div style={{
                display: 'inline-flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                // alignItems: 'stretch',
                alignContent: 'flex-start',
            }}>
            {this.state.tiles.map( tile => {
                return <Tile
                    key={tile.id}
                    onForward={this.onForward}
                    onBackward={this.onBackward}
                    onClose={this.onClose}
                    {...tile}
                    />
            })}
            </div>
        </div>;
    }
}
