import { Primitive } from "../../util-types";
import AssemblyLine from "../AssemblyLine";
import FetchingAssemblyLine from "./FetchingAssemblyLine";

/**
 * A BasicAssemblyLine for the `<img>` element.
 */
class ImageAssemblyLine<P extends AssemblyLine.Parameters> extends FetchingAssemblyLine<HTMLImageElement, P> {

    public override copy(): ImageAssemblyLine<P> {
        return new ImageAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLImageElement, P>[] = []) {
        super(() => document.createElement("img"), defaultParameters, steps);
    }

    /**
     * Adds a step that adds a text description.
     * @param alt value provider
     */
    public alt(alt: AssemblyLine.DynamicValue.Either<Primitive, HTMLImageElement, P>) {
        return this.addStep((e, params) => e.alt = String(AssemblyLine.DynamicValue.resolve(alt, e, params)));
    }

    /**
     * Adds a step that sets the loading mode.
     * @param loadingMode value provider
     */
    public loadingMode(loadingMode: AssemblyLine.DynamicValue.Either<ImageAssemblyLine.LoadingMode, HTMLImageElement, P>) {
        return this.addStep((e, params) => e.loading = AssemblyLine.DynamicValue.resolve(loadingMode, e, params));
    }

    /**
     * Adds a step that sets the width.
     * @param width value provider
     */
    public width(width: AssemblyLine.DynamicValue.Either<number, HTMLImageElement, P>) {
        return this.addStep((e, params) => e.width = Math.floor(AssemblyLine.DynamicValue.resolve(width, e, params)));
    }

    /**
     * Adds a step that sets the height.
     * @param height value provider
     */
    public height(height: AssemblyLine.DynamicValue.Either<number, HTMLImageElement, P>) {
        return this.addStep((e, params) => e.height = Math.floor(AssemblyLine.DynamicValue.resolve(height, e, params)));
    }

    /**
     * Adds a step that sets the image source link.
     * @param src value provider
     */
    public src(src: AssemblyLine.DynamicValue.Either<string | URL, HTMLImageElement, P>) {
        return this.addStep((e, params) => {
            const resolved = typeof src === "function" ? src(e, params) : src;
            e.src = resolved instanceof URL ? resolved.href : resolved;
        });
    }

    /**
     * Adds a step that provides a set of image source links
     * @param sources series of value providers
     */
    public srcset(...sources: AssemblyLine.DynamicValue.Either<string | URL, HTMLImageElement, P>[]) {
        return this.addStep((e, params) =>
            e.srcset = sources.map(src => typeof src === "function" ? src(e, params) : src)
                .map(String)
                .join(',')
        );
    }

    /**
     * Adds a step that provides allowed sizes.
     * @param sizes series of value providers
     */
    public sizes(...sizes: AssemblyLine.DynamicValue.Either<string, HTMLImageElement, P>[]) {
        return this.addStep((e, params) =>
            e.sizes = sizes.map(s => AssemblyLine.DynamicValue.resolve(s, e, params))
                .join(',')
        );
    }

}

namespace ImageAssemblyLine {

    export enum LoadingMode {
        EAGER = "eager",
        LAZY = "lazy"
    }

}

export default ImageAssemblyLine;