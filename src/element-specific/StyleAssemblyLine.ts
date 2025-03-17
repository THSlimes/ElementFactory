import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

/**
 * A BasicAssemblyLine for the `<style>` element.
 */
export default class StyleAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLStyleElement, P> {

    public override copy(): StyleAssemblyLine<P> {
        return new StyleAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLStyleElement, P>[] = []) {
        super(() => document.createElement("style"), defaultParameters, steps);
    }

    /**
     * Adds a step that determines whether the stylesheet is disabled.
     * @param isDisabled value provider
     */
    public isDisabled(isDisabled: AssemblyLine.DynamicValue.Either<boolean, HTMLStyleElement, P>) {
        return this.addStep((e, params) => e.disabled = AssemblyLine.DynamicValue.resolve(isDisabled, e, params));
    }

}