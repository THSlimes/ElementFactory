import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";
import OptionAssemblyLine from "./OptionAssemblyLine";


/**
 * A BasicAssemblyLine for the `<datalist>` element.
 */
export default class DataListAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLDataListElement, P> {

    public override copy(): DataListAssemblyLine<P> {
        return new DataListAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLDataListElement, P>[] = []) {
        super(() => document.createElement("datalist"), defaultParameters, steps);
    }

    /**
     * Adds a step that provides the options.
     * @param options series of value providers
     */
    public options(...options: AssemblyLine.DynamicValue.Either<HTMLOptionElement | OptionAssemblyLine<any, {}>>[]) {
        return this.children(...options);
    }

}