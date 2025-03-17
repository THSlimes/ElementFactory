import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";


/**
 * A BasicAssemblyLine for the `<iframe>` element.
 */
export default class IFrameAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLIFrameElement, P> {

    public override copy(): IFrameAssemblyLine<P> {
        return new IFrameAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLIFrameElement, P>[] = []) {
        super(() => document.createElement("iframe"), defaultParameters, steps);
    }

    /**
     * Adds a step that sets the IFrame permission policy.
     * @param allow value provider
     */
    public allow(allow: AssemblyLine.DynamicValue.Either<string, HTMLIFrameElement, P>) {
        return this.addStep((e, params) => e.allow = AssemblyLine.DynamicValue.resolve(allow, e, params));
    }

    /**
     * Adds a step that determines whether the IFrame contents are allowed to use fullscreen.
     * @param allowFullscreen value provider
     */
    public allowFullscreen(allowFullscreen: AssemblyLine.DynamicValue.Either<boolean, HTMLIFrameElement, P>) {
        return this.addStep((e, params) => e.allowFullscreen = AssemblyLine.DynamicValue.resolve(allowFullscreen, e, params));
    }

    /**
     * Adds a step that sets the IFrame's source link.
     * @param src value provider
     */
    public src(src: AssemblyLine.DynamicValue.Either<string | URL, HTMLIFrameElement, P>) {
        return this.addStep((e, params) => {
            const resolved = typeof src === "function" ? src(e, params) : src;
            e.src = resolved instanceof URL ? resolved.href : resolved;
        });
    }

}