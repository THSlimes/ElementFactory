import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";
import OptionAssemblyLine from "./OptionAssemblyLine";

/**
 * A BasicAssemblyLine for the `<optgroup>` element.
 *
 * @param V union type of the option values
 */
export default class OptGroupAssemblyLine<P extends AssemblyLine.Parameters, V extends string = never> extends BasicAssemblyLine<HTMLOptGroupElement, P> {

    public override copy(): OptGroupAssemblyLine<P, V> {
        return new OptGroupAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLOptGroupElement, P>[] = []) {
        super(() => document.createElement("optgroup"), defaultParameters, steps);
    }

    /**
     * Adds a step that determines whether the optgroup is disabled.
     * @param isDisabled value provider
     */
    public isDisabled(isDisabled: AssemblyLine.DynamicValue.Either<boolean, HTMLOptGroupElement, P>): this {
        return this.addStep((e, params) => e.disabled = AssemblyLine.DynamicValue.resolve(isDisabled, e, params));
    }

    /**
     * Adds a step that determines the optgroup's label.
     * @param label value provider
     */
    public label(label: AssemblyLine.DynamicValue.Either<string, HTMLOptGroupElement, P>): this {
        return this.addStep((e, params) => e.label = AssemblyLine.DynamicValue.resolve(label, e, params));
    }

    /**
     * Adds a step that adds options to the optgroup.
     * @param options series of `<option>` providers
     */
    public options<AV extends string>(...options: AssemblyLine.DynamicValue.Either<HTMLOptionElement | OptionAssemblyLine<any, {}>>[]) {
        return this.children(...options) as OptGroupAssemblyLine<P, V | AV>;
    }

}