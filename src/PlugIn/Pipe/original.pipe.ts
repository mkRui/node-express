import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'

@Injectable()
export default class OriginalPipe implements PipeTransform {
    transform (value: any, metadata: ArgumentMetadata) {
        console.log(value)
        console.log(metadata)
        console.log('进入管道啦。。。。')
        return Number(value.id)
    }
}