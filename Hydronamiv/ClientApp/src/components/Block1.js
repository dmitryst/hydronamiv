import React, { Component } from "react";
import { connect } from "react-redux";
import { changeValue, loadItems } from "../actionCreators/actionCreators";
import getItems from "../items";

function Item(props) {
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
    );
}

class Block1 extends Component {
    componentDidMount() {
        this.props.loadItems(getItems());
        console.log(this.props.location.pathname);
    }

    renderItem(d) {
        return (
            <Item
                key={d.id}
                id={d.id}
                rn={d.rn}
                name={d.name}
                not={d.not}
                val={d.val}
                um={d.um}
                isInput={d.isInput}
                onChange={e =>
                    this.props.changeValue({ id: d.id, value: e.target.value })
                }
            />
        );
    }

    render() {
        //if (this.props.location.pathname === 'block1') {
            return (
                <div>
                    <h2>Блок 1. Исходные данные для расчета</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>№п.п.</th>
                                <th>Наименование</th>
                                <th>Обозначение</th>
                                <th>Количество</th>
                                <th>Ед. измерения</th>
                            </tr>
                        </thead>
                        <tbody>{this.props.items.filter(x => x.block === 1).map(x => this.renderItem(x))}</tbody>
                    </table>
                </div>
            );
        //}

        //if (this.props.location.pathname === 'block2') {
        //    return (
        //        <div>
        //            <h2>Блок 2. Расчет производительности земснаряда</h2>
        //            <table className="table">
        //                <thead>
        //                    <tr>
        //                        <th>№п.п.</th>
        //                        <th>Наименование/Расчетная формула</th>
        //                        <th>Значение</th>
        //                        <th>Ед. измерения</th>
        //                        <th>Прим.</th>
        //                    </tr>
        //                </thead>
        //                <tbody>{this.props.items.filter(x => x.block === 2).map(x => this.renderItem2(x))}</tbody>
        //            </table>
        //        </div>
        //    );
        //}

        //return <div/>
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
export default connect(mapStateToProps, mapDispatchToProps)(Block1);
