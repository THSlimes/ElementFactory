import { Primitive } from "../util-types";
import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

/**
 * A BasicAssemblyLine for the `<label>` element.
 */
export default class LabelAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLLabelElement, P> {

    public override copy(): LabelAssemblyLine<P> {
        return new LabelAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLLabelElement, P>[] = []) {
        super(() => document.createElement("label"), defaultParameters, steps);
    }

    /**
     * Adds a step that provides (the id of) the element that the label is for.
     * @param elementOrID value provider
     */
    public for(elementOrID: AssemblyLine.DynamicValue.Either<Primitive | Element, HTMLLabelElement, P>) {
        return this.addStep((e, params) => {
            const resolved = typeof elementOrID === "function" ? elementOrID(e, params) : elementOrID;
            e.id = resolved instanceof Element ? resolved.id : String(resolved);
        });
    }

}