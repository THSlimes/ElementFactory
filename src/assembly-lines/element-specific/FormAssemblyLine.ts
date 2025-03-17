import { Primitive } from "../../util-types";
import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";


/**
 * A BasicAssemblyLine for the `<form>` element.
 */
class FormAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLFormElement, P> {

    public override copy(): FormAssemblyLine<P> {
        return new FormAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLFormElement, P>[] = []) {
        super(() => document.createElement("form"), defaultParameters, steps);
    }

    /**
     * Adds a step that sets the form's name.
     * @param name value provider
     */
    public name(name: AssemblyLine.DynamicValue.Either<Primitive, HTMLFormElement, P>) {
        return this.addStep((e, params) => e.name = String(AssemblyLine.DynamicValue.resolve(name, e, params)));
    }

    /**
     * Adds a step that sets the form's method.
     * @param method value provider
     */
    public method(method: AssemblyLine.DynamicValue.Either<FormAssemblyLine.Method, HTMLFormElement, P>) {
        return this.addStep((e, params) => e.method = String(AssemblyLine.DynamicValue.resolve(method, e, params)));
    }

}

namespace FormAssemblyLine {

    export enum Method {
        POST = "post",
        GET = "get",
        DIALOG = "dialog"
    }

}

export default FormAssemblyLine;