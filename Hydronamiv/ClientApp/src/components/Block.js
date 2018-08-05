import React, { Component } from "react";
import { connect } from "react-redux";
import { changeValue, loadItems } from "../actionCreators/actionCreators";
import getItems from "../items";

let itemsLoaded;
let block;
let blockNumber;

function Block1Item(props) {
    if (props.block === 1)
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
    return <tr></tr>
}

function Block2Item(i) {
    if (i.block === 2) {
        if (i.parent === 0)
            return (
                <ParentBlock2Item {...i} />
            )
        else return (
            <ChildBlock2Item {...i} />
        )
    }
    return <tr></tr>
}

function ParentBlock2Item(props) {
    return (
        <tr key={props.id}>
            <td><strong>{props.rn}</strong></td>
            <td><span><strong>{props.name}</strong></span>

                {props.not !== "" ? (
                    <img src={"img/" + props.not} />
                ) : (
                        <img />
                    )}
            </td>

            {props.isInput ? (
                <td>
                    <strong><input type="text" value={props.val} onChange={props.onChange} /></strong>
                </td>
            ) : (
                    <td><strong>{props.val}</strong></td>
                )}

            <td><strong>{props.um}</strong></td>
            <td><strong></strong></td>
        </tr>
    );
}

function ChildBlock2Item(props) {
    return (
        <tr key={props.id}>
            <td>{props.rn}</td>

            <td>
            {props.not !== "" ? (               
                    <img src={"img/" + props.not} />
            ) : (
                    <img />
                )}
            - {props.name}</td>

            {props.isInput ? (
                <td>
                    <input type="text" value={props.val} onChange={props.onChange} />
                </td>
            ) : (
                    <td>{props.val}</td>
                )}

            <td>{props.um}</td>
            <td>{props.comment}</td>
        </tr>
    );
}

class Block extends Component {

    componentDidMount() {
        block = this.props.location.pathname;
        let lastChar = block.substr(block.length - 1);
        blockNumber = parseFloat(lastChar);

        if (!itemsLoaded) {
            this.props.loadItems(getItems());
            itemsLoaded = true;
        }

        //console.log(this.props.location.pathname);
    }

    renderBlock1Item(i) {
        return (
            <Block1Item
                key={i.id}
                id={i.id}
                block={i.block}
                rn={i.rn}
                name={i.name}
                not={i.not}
                val={i.val}
                um={i.um}
                isInput={i.isInput}
                parent={i.parent}
                onChange={e =>
                    this.props.changeValue({ id: i.id, value: e.target.value })
                }
            />
        );
    }

    renderBlock2Item(i) {
        return (
            <Block2Item
                key={i.id}
                id={i.id}
                block={i.block}
                rn={i.rn}
                name={i.name}
                not={i.not}
                val={i.val}
                um={i.um}
                isInput={i.isInput}
                parent={i.parent}
                comment={i.comment}
                onChange={e =>
                    this.props.changeValue({ id: i.id, value: e.target.value })
                }
            />
        );
    }

    renderBlock1() {
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
                    <tbody>{this.props.items.map(x => this.renderBlock1Item(x))}</tbody>
                </table>
            </div>
        );
    }

    renderBlock2() {
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
                    <tbody>{this.props.items.map(x => this.renderBlock2Item(x))}</tbody>
                </table>
            </div>
        );
    }

    // интересно, что сначала вызывается render() метод, а потом уже componentDidMount()
    render() {
        if (this.props.location.pathname === '/block1') {
            return this.renderBlock1()
        }

        if (this.props.location.pathname === '/block2') {
            return this.renderBlock2()
        }

        else return <div>Не найден раздел для отображения</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Block);
