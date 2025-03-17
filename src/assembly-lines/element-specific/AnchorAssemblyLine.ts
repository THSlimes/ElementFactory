import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

/**
 * A BasicAssemblyLine for the `<a>` element.
 */
export default class AnchorAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLAnchorElement, P> {

    public override copy(): AnchorAssemblyLine<P> {
        return new AnchorAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLAnchorElement, P>[] = []) {
        super(() => document.createElement('a'), defaultParameters, steps);
    }

    /**
     * Adds a step that determines whether the linked file will be downloaded instead.
     * @param doDownload value provider
     */
    public doDownload(doDownload: AssemblyLine.DynamicValue.Either<boolean, HTMLAnchorElement, P>) {
        return this.addStep((e, params) => e.download = AssemblyLine.DynamicValue.resolve(doDownload, e, params) ? "true" : "");
    }

    /**
     * Adds a step that sets the href (redirect link).
     * @param href provider for the link
     */
    public href(href: AssemblyLine.DynamicValue.Either<string | URL, HTMLAnchorElement, P>) {
        return this.addStep((e, params) => {
            const resolved = typeof href === "function" ? href(e, params) : href;
            e.href = resolved instanceof URL ? resolved.href : resolved;
        });
    }

    /**
     * Adds a step that sets the referrerPolicy field.
     * @param referrerPolicy value provider
     */
    public referrerPolicy(referrerPolicy: AssemblyLine.DynamicValue.Either<string, HTMLAnchorElement, P>) {
        return this.addStep((e, params) => e.referrerPolicy = AssemblyLine.DynamicValue.resolve(referrerPolicy, e, params));
    }

    /**
     * Adds a step that determines whether the link will be opened in a new tab.
     * @param openInNew value provider
     */
    public openInNewTab(openInNew: AssemblyLine.DynamicValue.Either<boolean, HTMLAnchorElement, P>) {
        return this.addStep((e, params) => e.target = AssemblyLine.DynamicValue.resolve(openInNew, e, params) ? "_blank" : "");
    }


}