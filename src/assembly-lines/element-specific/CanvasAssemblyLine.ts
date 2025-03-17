import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";


/**
 * A BasicAssemblyLine for the `<canvas>` element.
 */
export default class CanvasAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLCanvasElement, P> {

    public override copy(): CanvasAssemblyLine<P> {
        return new CanvasAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLCanvasElement, P>[] = []) {
        super(() => document.createElement("canvas"), defaultParameters, steps);
    }

    /**
     * Adds a step that sets the canvas width.
     * @param width value provider
     */
    public width(width: AssemblyLine.DynamicValue.Either<number, HTMLCanvasElement, P>) {
        return this.addStep((e, params) => e.width = Math.floor(AssemblyLine.DynamicValue.resolve(width, e, params)));
    }

    /**
     * Adds a step that sets the canvas height.
     * @param height value provider
     */
    public height(height: AssemblyLine.DynamicValue.Either<number, HTMLCanvasElement, P>) {
        return this.addStep((e, params) => e.height = Math.floor(AssemblyLine.DynamicValue.resolve(height, e, params)));
    }

}