import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

/**
 * A BasicAssemblyLine for the `<table>` element.
 */
export default class TableAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLTableElement, P> {

    public override copy(): TableAssemblyLine<P> {
        return new TableAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLTableElement, P>[] = []) {
        super(() => document.createElement("table"), defaultParameters, steps);
    }

    /**
     * Adds a step that gives the table a caption.
     * @param caption provider for the caption's text
     */
    public caption(caption: AssemblyLine.DynamicValue.Either<string, HTMLTableElement, P>) {
        return this.addStep((e, params) => {
            const captionElem = document.createElement("caption");
            captionElem.textContent = AssemblyLine.DynamicValue.resolve(caption, e, params);

            e.caption = captionElem;
        });
    }

}