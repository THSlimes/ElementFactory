import { Primitive } from "../util-types";
import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

/**
 * A BasicAssemblyLine for the `<textarea>` element.
 */
export default class TextAreaAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLTextAreaElement, P> {

    public override copy(): TextAreaAssemblyLine<P> {
        return new TextAreaAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLTextAreaElement, P>[] = []) {
        super(() => document.createElement("textarea"), defaultParameters, steps);
    }

    /**
     * Adds a step that determines whether the textarea is disabled.
     * @param isDisabled value provider
     */
    public isDisabled(isDisabled: AssemblyLine.DynamicValue.Either<boolean, HTMLTextAreaElement, P>): this {
        return this.addStep((e, params) => e.disabled = AssemblyLine.DynamicValue.resolve(isDisabled, e, params));
    }

    /**
     * Adds a step that determines whether the textarea is required in its form.
     * @param isRequired value provider
     */
    public isRequired(isRequired: AssemblyLine.DynamicValue.Either<boolean, HTMLTextAreaElement, P>): this {
        return this.addStep((e, params) => e.required = AssemblyLine.DynamicValue.resolve(isRequired, e, params));
    }

    /**
     * Adds a step that sets the textarea's name.
     * @param name value provider
     */
    public name(name: AssemblyLine.DynamicValue.Either<Primitive, HTMLTextAreaElement, P>): this {
        return this.addStep((e, params) => e.name = String(AssemblyLine.DynamicValue.resolve(name, e, params)));
    }

    public override text(text: AssemblyLine.DynamicValue.Either<Primitive, HTMLTextAreaElement, P>): this {
        // set value instead of textContent
        return this.addStep((e, params) => e.value = String(AssemblyLine.DynamicValue.resolve(text, e, params)));
    }

    /**
     * Adds a step that sets the height of the textarea.
     * @param numRows value provider
     */
    public numRows(numRows: AssemblyLine.DynamicValue.Either<number, HTMLTextAreaElement, P>): this {
        return this.addStep((e, params) => e.rows = Math.floor(AssemblyLine.DynamicValue.resolve(numRows, e, params)));
    }

    /**
     * Adds a step that sets the width of the textarea.
     * @param numColumns value provider
     */
    public numColumns(numColumns: AssemblyLine.DynamicValue.Either<number, HTMLTextAreaElement, P>): this {
        return this.addStep((e, params) => e.rows = Math.floor(AssemblyLine.DynamicValue.resolve(numColumns, e, params)));
    }

    /**
     * Adds a step that sets the minimum length.
     * @param minLength value provider
     */
    public minLength(minLength: AssemblyLine.DynamicValue.Either<number, HTMLTextAreaElement, P>): this {
        return this.addStep((e, params) => e.minLength = Math.floor(AssemblyLine.DynamicValue.resolve(minLength, e, params)));
    }

    /**
     * Adds a step that sets the maximum length.
     * @param maxLength value provider
     */
    public maxLength(maxLength: AssemblyLine.DynamicValue.Either<number, HTMLTextAreaElement, P>): this {
        return this.addStep((e, params) => e.maxLength = Math.floor(AssemblyLine.DynamicValue.resolve(maxLength, e, params)));
    }

}