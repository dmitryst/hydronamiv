import React, { Component } from "react";
import { connect } from "react-redux";
import { changeValue, loadItems } from "../actionCreators/actionCreators";
import getItems from "../items";

function Block2Item(props) {
    if (props.parent === 0) {
        return (<ParentItem props={props} />)        
    }
    else {
        return (<ChildItem props={props} />)    
    }
}

function ParentItem(props) {
    return (
        <tr key={props.id}>
            <td>{props.rn}</td>
            <td>{props.name}</td>

            {props.not !== "" ? (
                <td>
                    <img src={"img/" + props.not} />
                </td>
            ) : (
                    <td />
                )}

            {props.isInput ? (
                <td>
                    <input type="text" value={props.val} onChange={props.onChange} />
                </td>
            ) : (
                    <td>{props.val}</td>
                )}

            <td>{props.um}</td>
        </tr>
        //{ renderGde() }
    );
}

function renderGde() {
    return (
        <tr><td></td><td>где:</td></tr>
    );
}

function ChildItem(props) {
    return (
        <tr key={props.id}>
            <td></td>

            {props.not !== "" ? (
                <td>
                    <img src={"img/" + props.not} />
                </td>
            ) : (
                    <td />
                )}

            <td> - {props.name}</td>

            {props.isInput ? (
                <td>
                    <input type="text" value={props.val} onChange={props.onChange} />
                </td>
            ) : (
                    <td>{props.val}</td>
                )}

            <td>{props.um}</td>
        </tr>
    );
}

class Block2 extends Component {
    componentDidMount() {
        this.props.loadItems(getItems());
        console.log(this.props.location.pathname);
    }

    renderBlock2Item(d) {
        return (
            <Block2Item
                key={d.id}
                id={d.id}
                rn={d.rn}
                name={d.name}
                not={d.not}
                val={d.val}
                um={d.um}
                isInput={d.isInput}
                parent={d.parent}
                onChange={e =>
                    this.props.changeValue({ id: d.id, value: e.target.value })
                }
            />
        );
    }

    render() {
        return (
            <div>
                <h2>Блок 2. Расчет производительности земснаряда</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>№п.п.</th>
                            <th>Наименование/Расчетная формула</th>
                            <th>Значение</th>
                            <th>Ед. измерения</th>
                            <th>Прим.</th>
                        </tr>
                    </thead>
                    <tbody>{this.props.items.filter(x => x.block === 2).map(x => this.renderBlock2Item(x))}</tbody>
                </table>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        items: state.items
    };
};
const mapDispatchToProps = dispatch => {
    return {
        changeValue: item => dispatch(changeValue(item)),
        loadItems: items => dispatch(loadItems(items))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Block2);
