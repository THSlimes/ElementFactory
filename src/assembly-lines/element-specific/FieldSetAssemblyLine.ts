import { Primitive } from "../../util-types";
import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";


/**
 * A BasicAssemblyLine for the `<fieldset>` element.
 */
export default class FieldSetAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLFieldSetElement, P> {

    public override copy(): FieldSetAssemblyLine<P> {
        return new FieldSetAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLFieldSetElement, P>[] = []) {
        super(() => document.createElement("fieldset"), defaultParameters, steps);
    }

    /**
     * Adds a step that sets the fieldset's name.
     * @param name value provider
     */
    public name(name: AssemblyLine.DynamicValue.Either<Primitive, HTMLFieldSetElement, P>) {
        return this.addStep((e, params) => e.name = String(AssemblyLine.DynamicValue.resolve(name, e, params)));
    }

}