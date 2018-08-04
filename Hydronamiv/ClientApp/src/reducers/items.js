import { changeValueType, loadItemsType } from "../actionCreators/actionCreators";
import getItems from "../items.js";
const items = getItems();
const Parser = require("expr-eval").Parser;

export const reducer = (state = [], action)  => {
    if (action.type === loadItemsType) {
        return action.items;
    }
    if (action.type === changeValueType) {
        let changedId = action.item.id;
        let newValue = action.item.value;
        //console.log(changedId);

        let newState = [...state];
        //console.log(newState);

        let el = newState.find(d => d.id === changedId);
        el.val = parseFloat(newValue);

        // find all ids that should be re-calculate
        const toRecalculate = getAllDependentDataId(changedId);
        //console.log(toRecalculate);

        // recalculation
        toRecalculate.forEach(r => {
            let obj = newState.find(d => d.id === r);
            let operandsObj = {};

            Object.keys(obj.operands).forEach(e => {
                //console.log(`key=${e}  value=${obj.operands[e]}`);
                let o = newState.find(d => d.id === obj.operands[e]);

                operandsObj[`${e}`] = o.val;
            });
            //console.log(operandsObj);

            let expr = Parser.parse(obj.formula);
            let result = expr.evaluate(operandsObj);
            //console.log(result);

            let el = newState.find(d => d.id === r);
            el.val = Math.round((result + 0.00001) * 100) / 100;
        });

        //console.log(newState);
        return newState;
    }
    return state;
}

function getAllDependentDataId(changedId) {
    let toRecalculate = [];
    items.forEach(d => {
        if (!isEmpty(d.operands)) {
            let values = Object.values(d.operands);
            if (values.includes(changedId)) {
                toRecalculate.push(d.id);
            }
        }
    });
    return toRecalculate;
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
