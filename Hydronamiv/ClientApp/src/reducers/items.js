import { changeValueType, loadItemsType } from "../actionCreators/actionCreators";
import getItems from "../items.js";
const items = getItems();
const Parser = require("expr-eval").Parser;

export const reducer = (state = [], action) => {
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

        let recalculate = shouldRecalculate(changedId);
        if (recalculate) {
            el.val = parseFloat(newValue);

            // find all ids that should be re-calculate
            //const toRecalculate = getAllDependentDataId(changedId);
            //console.log(toRecalculate);

            // recalculation
            let sortedItems = items.sort(dynamicSort("calcOrder"));
            sortedItems.forEach(i => {

                let obj = newState.find(x => x.id === i.id);

                //debug
                //if (i.id === 117)
                //{
                //    let y;
                //    y = 1;
                //}

                // if obj has operands prop and operands prop has some values
                if (('operands' in obj) && (Object.keys(obj.operands).length !== 0)) {
                    let operandsObj = {};

                    Object.keys(obj.operands).forEach(e => {
                        //console.log(`key=${e}  value=${obj.operands[e]}`);
                        let o = newState.find(x => x.id === obj.operands[e]);

                        try {
                            operandsObj[`${e}`] = o.val;
                        } catch (e) {
                            console.log("Error operandsObj[`${e}`] = o.val, id = " + i.id, o);
                        }
                        
                    });
                    //console.log(operandsObj);

                    let expr, result;
                    try {
                        expr = Parser.parse(obj.formula);
                        result = expr.evaluate(operandsObj);
                    }
                    catch (e) {
                        console.log("Error parse formula: id = " + i.id);
                    }

                    //console.log(result);

                    let el = newState.find(x => x.id === i.id);
                    let roundKoeff;
                    if ('round' in i) {
                        roundKoeff = Math.pow(10, i.round)
                    }
                    else {
                        roundKoeff = 100;
                    }
                    el.val = Math.round((result + 0.00001) * roundKoeff) / roundKoeff;
                }
            });
        }
        else {
            el.val = newValue;
        }

        //console.log(newState);
        return newState;
    }
    return state;
}

// check whether we should recalculate formulas on changing an input value
function shouldRecalculate(changedId) {
    let result = false;
    items.some(i => {
        let exists = false;
        if (i.id !== i && 'operands' in i && (Object.keys(i.operands).lenght !== 0)) {
            exists = Object.values(i.operands).some(val => {
                return val === changedId;
            });
            if (exists) result = true;
        }
        return exists;
    });
    return result;
}

//function getAllDependentDataId(changedId) {
//    let toRecalculate = [];
//    items.forEach(d => {
//        if (!isEmpty(d.operands)) {
//            let values = Object.values(d.operands);
//            if (values.includes(changedId)) {
//                toRecalculate.push(d.id);
//            }
//        }
//    });
//    return toRecalculate;
//}

function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

// dynamic sort function that sorts objects by their prop value
function dynamicSort(prop) {
    let sortOrder = 1;
    if (prop[0] === "-") {
        sortOrder = -1;
        prop = prop.substr(1);
    }

    return function (a, b) {
        // if a has no calcOrder prop
        //if (!('calcOrder' in a)) {
        //    return -1 * sortOrder;
        //}

        //if (!('calcOrder' in b)) {
        //    return -1 * sortOrder;
        //}

        let res = (a[prop] < b[prop]) ? -1 : (a[prop] > b[prop]) ? 1 : 0;
        return res * sortOrder;
    }
}