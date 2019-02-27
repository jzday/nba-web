import React from 'react';
import nba from 'nba';
import {Profile} from "./Profile";
import {DataViewContainer} from "./DataViewContainer";
import {SearchBar} from "./SearchBar";

export class Main extends React.Component {
    state = {
        playerId: nba.findPlayer("Lebron James").playerId,
        playerInfo: {}
    }

    componentDidMount() {
        const playerId = nba.findPlayer("Lebron James").playerId;
        nba.stats.playerInfo({PlayerID: this.state.playerId}).then((info) => {

            //playerInfo 相当于把几个数据整合成一个数据了
            const playerInfo = Object.assign(
                info.commonPlayerInfo[0], info.playerHeadlineStats[0]
            );

            this.setState({
                playerInfo: playerInfo,
            });
        });
    }

    render() {
        console.log(this.state.playerInfo);
        return (
            <div className="main">
                <SearchBar/>
                <div className= "player">
                <Profile playerId={this.state.playerId}
                         playerInfo={this.state.playerInfo}/>
                <DataViewContainer playerId={this.state.playerId}/>
                </div>
            </div>
        )
    }
}