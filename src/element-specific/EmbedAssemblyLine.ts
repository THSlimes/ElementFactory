import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";


/**
 * A BasicAssemblyLine for the `<embed>` element.
 */
export default class EmbedAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLEmbedElement, P> {

    public override copy(): EmbedAssemblyLine<P> {
        return new EmbedAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLEmbedElement, P>[] = []) {
        super(() => document.createElement("embed"), defaultParameters, steps);
    }

    /**
     * Adds a step that sets the width.
     * @param width value provider
     */
    public width(width: AssemblyLine.DynamicValue.Either<number, HTMLEmbedElement, P>) {
        return this.addStep((e, params) => e.width = Math.floor(AssemblyLine.DynamicValue.resolve(width, e, params)).toString());
    }

    /**
     * Adds a step that sets the height.
     * @param height value provider
     */
    public height(height: AssemblyLine.DynamicValue.Either<number, HTMLEmbedElement, P>) {
        return this.addStep((e, params) => e.height = Math.floor(AssemblyLine.DynamicValue.resolve(height, e, params)).toString());
    }

    /**
     * Adds a step that provides the source link.
     * @param src value provider
     */
    public src(src: AssemblyLine.DynamicValue.Either<string | URL, HTMLEmbedElement, P>) {
        return this.addStep((e, params) => {
            const resolved = typeof src === "function" ? src(e, params) : src;
            e.src = resolved instanceof URL ? resolved.href : resolved;
        });
    }

}