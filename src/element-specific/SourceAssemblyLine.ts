import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

/**
 * A BasicAssemblyLine for the `<source>` element.
 */
class SourceAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLSourceElement, P> {

    public override copy(): SourceAssemblyLine<P> {
        return new SourceAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLSourceElement, P>[] = []) {
        super(() => document.createElement("source"), defaultParameters, steps);
    }

    /**
     * Adds a step that sets the source's MIME type.
     * @param type value provider
     */
    public type(type: AssemblyLine.DynamicValue.Either<string, HTMLSourceElement, P>) {
        return this.addStep((e, params) => e.type = AssemblyLine.DynamicValue.resolve(type, e, params));
    }

    /**
     * Adds a step that sets the width.
     * @param width value provider
     */
    public width(width: AssemblyLine.DynamicValue.Either<number, HTMLSourceElement, P>) {
        return this.addStep((e, params) => e.width = Math.floor(AssemblyLine.DynamicValue.resolve(width, e, params)));
    }

    /**
     * Adds a step that sets the height.
     * @param height value provider
     */
    public height(height: AssemblyLine.DynamicValue.Either<number, HTMLSourceElement, P>) {
        return this.addStep((e, params) => e.height = Math.floor(AssemblyLine.DynamicValue.resolve(height, e, params)));
    }

    /**
     * Adds a step that sets the element's source (src)
     * @param src value provider
     */
    public src(src: AssemblyLine.DynamicValue.Either<string | URL, HTMLSourceElement, P>) {
        return this.addStep((e, params) => {
            const resolved = typeof src === "function" ? src(e, params) : src;
            e.src = resolved instanceof URL ? resolved.href : resolved;
        });
    }

    /**
     * Adds a step that provides a set of sources for the element
     * @param sources series of value providers
     */
    public srcset(...sources: AssemblyLine.DynamicValue.Either<string | URL, HTMLSourceElement, P>[]) {
        return this.addStep((e, params) =>
            e.srcset = sources.map(src => typeof src === "function" ? src(e, params) : src)
                .map(String)
                .join(',')
        );
    }

    /**
     * Adds a step that adds the allowed sizes for the element.
     * @param sizes series of value providers
     */
    public sizes(...sizes: AssemblyLine.DynamicValue.Either<string, HTMLSourceElement, P>[]) {
        return this.addStep((e, params) =>
            e.sizes = sizes.map(s => AssemblyLine.DynamicValue.resolve(s, e, params))
                .join(',')
        );
    }

}

export default SourceAssemblyLine;