import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";


/**
 * A BasicAssemblyLine for the `<base>` element.
 */
export default class BaseAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLBaseElement, P> {

    public override copy(): BaseAssemblyLine<P> {
        return new BaseAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLBaseElement, P>[] = []) {
        super(() => document.createElement("base"), defaultParameters, steps);
    }

    /**
     * Adds a step that sets the baseline link address.
     * @param href value provider
     */
    public href(href: AssemblyLine.DynamicValue.Either<string | URL, HTMLBaseElement, P>) {
        return this.addStep((e, params) => {
            const resolved = typeof href === "function" ? href(e, params) : href;
            e.href = resolved instanceof URL ? resolved.href : resolved;
        });
    }


}