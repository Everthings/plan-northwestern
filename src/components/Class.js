import React from 'react';
import { DragSource } from 'react-dnd';
import CourseManager from '../CourseManager.js';
import Utility from '../Utility.js';
import { TrashIcon, DocumentIcon, BookmarkIcon } from '@heroicons/react/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/solid';

const classSource = {

    beginDrag(props, monitor, component) {
        const item = {
            course: props.course,
            from: {
                year: props.yi,
                quarter: props.qi
            }
        }
        return item;
    }
  
  }
  
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class Class extends React.Component {

    openInfo() {
        let course = this.props.course;
        let color = CourseManager.getCourseColor(course.id);

        if (course.placeholder) {
            this.props.alert({
                title: 'Placeholder',
                subtitle: course.name,
                message: `If you aren't sure which course to take to fulfill a certain requirement, you can use a placeholder! Search using 'placeholder' or by requirement category to find placeholders.`,
                confirmButton: 'Close',
                confirmButtonColor: color,
                iconBackground: color,
                icon: (<DocumentIcon className={`h-6 w-6 text-${color}-600`} aria-hidden='true' />),
            })
            return;
        }

        let extras = [];

        if (course.prereqs) {
            extras.push(
                {
                    title: 'PREREQUISITES',
                    content: course.prereqs
                }
            )
        }

        if (course.distros) {
            let distros = Utility.convertDistros(course.distros);
            extras.push(
                {
                    title: 'DISTRIBUTION AREAS',
                    content: distros.join(', ')
                }
            )
        }

        extras.push(
            {
                title: 'UNITS',
                content: course.units
            }
        )

        let delCourse = this.props.delCourse;
        let favorites = this.props.favorites;
        let addFavorite = this.props.addFavorite;
        let delFavorite = this.props.delFavorite;

        this.props.alert({
            title: course.id,
            subtitle: course.name,
            message: course.description,
            confirmButton: 'Close',
            confirmButtonColor: color,
            iconBackgroundColor: color,
            icon: (<DocumentIcon className={`h-6 w-6 text-${color}-600`} aria-hidden='true' />),
            extras: extras,
            editButtons: [
                {
                    toggle: {
                        data: favorites.noCredit,
                        key: course,
                        enabled: {
                            title: 'Remove from My List',
                            icon: (<BookmarkIconSolid className='w-6 h-6' />),
                            action: () => {
                                delFavorite(course, false);
                            }
                        },
                        disabled: {
                            title: 'Add to My List',
                            icon: (<BookmarkIcon className='w-6 h-6' />),
                            action: () => {
                                addFavorite(course, false);
                            }
                        }
                    },
                    color: 'indigo'
                },
                {
                    title: 'Remove course',
                    icon: <TrashIcon className='w-6 h-6' />,
                    color: 'red',
                    action: () => {
                        delCourse();
                    },
                    close: true
                }
            ]
        })
    }

    render() {

        let course = this.props.course;
        let color = CourseManager.getCourseColor(course.id);

        const { isDragging, connectDragSource } = this.props;

        let showMoreInfo = this.props.switches.more_info && !this.props.switches.compact;

        let isPlaceholder = course.placeholder;
        let units = parseFloat(course.units);

        return connectDragSource(
            <div className={`p-2 rounded-lg bg-opacity-60 bg-${color}-100 dark:bg-gray-800
            border-2 border-${color}-300 border-opacity-60 overflow-visible w-full text-left compact:px-2 compact:py-05
            hover:shadow-md transition ease-in-out duration-300 transform hover:-translate-y-1 group ${isDragging ? 'cursor-grab' : 'cursor-pointer'}`}
                    onClick={() => this.openInfo()}>
                <p className={`text-md ${isPlaceholder ? 'font-normal' : 'font-bold'} text-black dark:text-gray-50 compact:text-sm overflow-hidden whitespace-nowrap`}>
                    {isPlaceholder ? course.name : course.id}
                </p>
                <p className={`text-xs ${isPlaceholder ? 'font-light' : 'font-normal'} text-black dark:text-gray-50 overflow-hidden w-full block whitespace-nowrap overflow-ellipsis compact:hidden`} title={course.name}>
                    {isPlaceholder ? 'PLACEHOLDER' : course.name}
                </p>
                {showMoreInfo &&
                    <div>
                        {course.prereqs &&
                            <div className='mt-4 text-gray-500 dark:text-gray-400'>
                                <p className='text-xs font-bold'>
                                    PREREQUISITES
                                </p>
                                <p className='m-0 p-0 text-xs font-light whitespace-normal'>
                                    {course.prereqs}
                                </p>
                            </div>
                        }
                        {course.distros &&
                            <div className='mt-4 text-gray-500 dark:text-gray-400'>
                                <p className='text-xs font-bold'>
                                    DISTRIBUTION AREAS
                                </p>
                                <p className='m-0 p-0 text-xs font-light whitespace-normal'>
                                    {Utility.convertDistros(course.distros).join(', ')}
                                </p>
                            </div>
                        }
                        <div className='mt-1'>
                            <p className='text-xs text-right text-gray-500 dark:text-gray-400 font-light'>
                                <span className='font-medium'>{units}</span> {units === 1 ? 'unit' : 'units'}
                            </p>
                        </div>
                    </div>
                }
                <button className='absolute -top-2 -right-2 p-0.5 rounded-full bg-gray-200 hover:bg-red-100 dark:bg-gray-700
                        text-gray-500 dark:text-white text-xs opacity-80 hover:text-red-400 dark:hover:text-red-400 hover:opacity-100
                        transition-all duration-150 hidden group-hover:block z-20' onClick={e => {
                            e.stopPropagation();
                            this.props.delCourse();
                        }}>
                    <TrashIcon className='w-5 h-5'/>
                </button>
            </div>
        );
    }
}

export default DragSource('Class', classSource, collect)(Class);