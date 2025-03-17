import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";


/**
 * A BasicAssemblyLine for the `<dl>` element.
 */
export default class DListAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLDListElement, P> {

    public override copy(): DListAssemblyLine<P> {
        return new DListAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLDListElement, P>[] = []) {
        super(() => document.createElement("dl"), defaultParameters, steps);
    }

}