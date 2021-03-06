﻿import React, { Component } from "react";
import { connect } from "react-redux";
import { changeValue, loadItems } from "../actionCreators/actionCreators";
import getItems from "../items";

let itemsLoaded;
let block;
let blockNumber;

const THead = ({ columns }) => {
    return (
        <thead><tr>{columns.map(col => { return <th>{col}</th> })}</tr></thead>  
        );
}

function Block1Item(props) {
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
                    <input type={props.type !== undefined ? props.type : 'number'} value={props.val} onChange={props.onChange} style={{ width: 8 + 'em' }} />
                </td>
            ) : (
                    <td>{props.val}</td>
                )}

            <td>{props.um}</td>
        </tr>
    );
}

function Block2Item(i) {
    if (i.parent === 0)
        return (
            <ParentBlock2Item {...i} />
        )
    else return (
        <ChildBlock2Item {...i} />
    )
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
            <td>{props.comment} {props.commentImg !== undefined ? <img src={"img/" + props.commentImg} /> : <span></span>}</td>
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
                    <input type="number" value={props.val} onChange={props.onChange} style={{ width: 5 + 'em' }} />
                </td>
            ) : (
                    <td>{props.val}</td>
                )}

            <td>{props.um}</td>
            <td>{props.comment} {props.commentImg !== undefined ? <img src={"img/" + props.commentImg} /> : <span></span>}</td>
        </tr>
    );
}

function Block7Item(props) {
    return (
        props.parent !== 0 ? (
            <tr key={props.id}>
                <td>{props.rn}</td>
                <td>{props.name}</td>
                <td>{props.um}</td>
                <td>{props.val}</td>
            </tr>
        ) : (
                <tr key={props.id}>
                    <td><b>{props.rn}</b></td>
                    <td><b>{props.name}</b></td>
                    <td><b>{props.um}</b></td>
                    <td><b>{props.val}</b></td>
                </tr>
            )
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
                type={i.type}
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
                commentImg={i.commentImg}
                onChange={e =>
                    this.props.changeValue({ id: i.id, value: e.target.value })
                }
            />
        );
    }

    renderBlock7Item(i) {
        return (
            <Block7Item
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
            />
        );
    }

    renderBlock1() {
        return (
            <div className="block">
                <h2>Блок 1. Исходные данные для расчета</h2>
                <table className="table">
                    <THead columns={["№п.п.", "Наименование", "Обозначение", "Количество", "Ед. измерения"]} />
                    <tbody>{this.props.items.filter(x => x.block === 1).map(x => this.renderBlock1Item(x))}</tbody>
                </table>
            </div>
        );
    }

    renderBlock2() {
        return (
            <div className="block">
                <h2>Блок 2. Расчет производительности земснаряда</h2>
                <table className="table">
                    <THead columns={["№п.п.", "Наименование/Расчетная формула", "Значение", "Ед. измерения", "Прим."]} />
                    <tbody>{this.props.items.filter(x => x.block === 2).map(x => this.renderBlock2Item(x))}</tbody>
                </table>
            </div>
        );
    }

    renderBlock3() {
        return (
            <div className="block">
                <h2>Блок 3. Расчет гидротранспорта грунта от карьера до карты намыва (производится по методике Всесоюзного научно-исследовательского института гидротехники им. Б.Е.Веденеева (ВНИИГ)</h2>
                <table className="table">
                    <THead columns={["№п.п.", "Наименование/Расчетная формула", "Значение", "Ед. измерения", "Прим."]} />
                    <tbody>{this.props.items.filter(x => x.block === 3).map(x => this.renderBlock2Item(x))}</tbody>
                </table>
            </div>
        );
    }

    renderBlock4() {
        return (
            <div className="block">
                <h2>Блок 4. Расчет водосбросных сооружений на карте намыва</h2>
                <table className="table">
                    <THead columns={["№п.п.", "Наименование/Расчетная формула", "Значение", "Ед. измерения", "Прим."]} />
                    <tbody>{this.props.items.filter(x => x.block === 4).map(x => this.renderBlock2Item(x))}</tbody>
                </table>
            </div>
        );
    }

    renderBlock5() {
        return (
            <div className="block">
                <h2>Блок 5. Расчет основных параметров карты намыва</h2>
                <table className="table">
                    <THead columns={["№п.п.", "Наименование/Расчетная формула", "Значение", "Ед. измерения", "Прим."]} />
                    <tbody>{this.props.items.filter(x => x.block === 5).map(x => this.renderBlock2Item(x))}</tbody>
                </table>
            </div>
        );
    }

    renderBlock7() {
        return (
            <div className="block">
                <h2>Основные расчетные показатели</h2>
                <button type="button" className="btn btn-default" onClick={() => this.downloadWordDocument()}>
                    <span className="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Скачать в Word
                </button>
                <br /><br />
                <table className="table">
                    <THead columns={["№п.п.", "Наименование", "Ед. измерения", "Значение"]} />               
                    <tbody>{this.props.items.filter(x => x.block === 7).map(x => this.renderBlock7Item(x))}</tbody>
                </table>
            </div>
        );
    }

    downloadWordDocument() {
        let str = "";
        this.props.items.filter(x => x.block === 7 && x.val !== "").forEach(x => {
            str = `${str}${x.id}:${x.val},`;
        });

        str = str.substring(0, str.length - 1);

        window.location = ("api/Items/PrintWordDoc?data=" + str);
    }

    // интересно, что сначала вызывается render() метод, а потом уже componentDidMount()
    render() {

        if (this.props.location.pathname === '/block1') {
            return this.renderBlock1()
        }

        if (this.props.location.pathname === '/block2') {
            return this.renderBlock2()
        }

        if (this.props.location.pathname === '/block3') {
            return this.renderBlock3()
        }

        if (this.props.location.pathname === '/block4') {
            return this.renderBlock4()
        }

        if (this.props.location.pathname === '/block5') {
            return this.renderBlock5()
        }

        if (this.props.location.pathname === '/block7') {   // Основные расчетные показатели
            return this.renderBlock7()
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
