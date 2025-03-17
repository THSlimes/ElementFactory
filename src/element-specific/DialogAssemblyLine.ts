import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";


/**
 * A BasicAssemblyLine for the `<dialog>` element.
 */
export default class DialogAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLDialogElement, P> {

    public override copy(): DialogAssemblyLine<P> {
        return new DialogAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLDialogElement, P>[] = []) {
        super(() => document.createElement("dialog"), defaultParameters, steps);
    }

    /**
     * Adds a step that determines whether the dialog is open.
     * @param isOpen value provider
     */
    public isOpen(isOpen: AssemblyLine.DynamicValue.Either<boolean, HTMLDialogElement, P>) {
        return this.addStep((e, params) => e.open = AssemblyLine.DynamicValue.resolve(isOpen, e, params));
    }

}