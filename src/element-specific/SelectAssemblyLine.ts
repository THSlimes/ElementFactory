import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";
import OptGroupAssemblyLine from "./OptGroupAssemblyLine";
import OptionAssemblyLine from "./OptionAssemblyLine";

/**
 * A BasicAssemblyLine for the `<select>` element.
 *
 * @param V union type of the options
 */
export default class SelectAssemblyLine<P extends AssemblyLine.Parameters, V extends string = never> extends BasicAssemblyLine<HTMLSelectElement, P> {

    public override copy(): SelectAssemblyLine<P, V> {
        return new SelectAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLSelectElement, P>[] = []) {
        super(() => document.createElement("select"), defaultParameters, steps);
    }

    /**
     * Adds a step that determines whether the element is disabled.
     * @param isDisabled value provider
     */
    public isDisabled(isDisabled: AssemblyLine.DynamicValue.Either<boolean, HTMLSelectElement, P>): this {
        return this.addStep((e, params) => e.disabled = AssemblyLine.DynamicValue.resolve(isDisabled, e, params));
    }

    /**
     * Adds a step that determines whether a value is required.
     * @param isRequired value provider
     */
    public isRequired(isRequired: AssemblyLine.DynamicValue.Either<boolean, HTMLSelectElement, P>): this {
        return this.addStep((e, params) => e.required = AssemblyLine.DynamicValue.resolve(isRequired, e, params));
    }

    /**
     * Adds a step that sets the name.
     * @param name value provider
     */
    public name(name: AssemblyLine.DynamicValue.Either<string, HTMLSelectElement, P>): this {
        return this.addStep((e, params) => e.name = AssemblyLine.DynamicValue.resolve(name, e, params));
    }

    /**
     * Adds a step that adds options to the `<select>` element.
     * @param options series of `<option>` or `<optgroup>` providers
     */
    public options<AV extends string>(...options: (OptionAssemblyLine<AV, P> | OptGroupAssemblyLine<P, AV>)[]) {
        return this.addStep((e, params) => options.forEach(o => e.add(o.make(params)))) as SelectAssemblyLine<P, V | AV>;
    }

    /**
     * Adds a step that sets the current value.
     * @param value value provider
     */
    public value(value: AssemblyLine.DynamicValue.Either<V, HTMLSelectElement, P>): this {
        return this.addStep((e, params) => e.value = AssemblyLine.DynamicValue.resolve(value, e, params));
    }

    /**
     * Adds a step that attaches an event handler for when the value is changed.
     * @param listener callback function
     */
    public onValueChanged(listener: (value: V, ev: Event, select: HTMLSelectElement) => void) {
        return this.on("change", (ev, select) => listener(select.value as V, ev, select));
    }

    /**
     * Adds a step that attaches a single-use event handler for when the value is changed.
     * @param listener callback function
     */
    public onceValueChanged(listener: (value: V, ev: Event, select: HTMLSelectElement) => void) {
        return this.once("change", (ev, select) => listener(select.value as V, ev, select));
    }


}