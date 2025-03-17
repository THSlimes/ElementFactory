import { Primitive } from "../util-types";
import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";


/**
 * A BasicAssemblyLine for the `<button>` element.
 */
export default class ButtonAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLButtonElement, P> {

    public override copy(): ButtonAssemblyLine<P> {
        return new ButtonAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLButtonElement, P>[] = []) {
        super(() => document.createElement("button"), defaultParameters, steps);
    }

    /**
     * Adds a step that determines whether the button is disabled.
     * @param isDisabled value provider
     */
    public isDisabled(isDisabled: AssemblyLine.DynamicValue.Either<boolean, HTMLButtonElement, P>) {
        return this.addStep((e, params) => e.disabled = AssemblyLine.DynamicValue.resolve(isDisabled, e, params));
    }

    /**
     * Adds a step that sets the button's name.
     * @param name value provider
     */
    public name(name: AssemblyLine.DynamicValue.Either<Primitive, HTMLButtonElement, P>) {
        return this.addStep((e, params) => e.name = String(AssemblyLine.DynamicValue.resolve(name, e, params)));
    }

}