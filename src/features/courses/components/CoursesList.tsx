import { Eye, GraduationCap, Pencil, Trash2, Users } from "lucide-react";

import Table from "../../../components/table/Table";
import TableHead from "../../../components/table/TableHead";
import TableHeader from "../../../components/table/TableHeader";
import TableBody from "../../../components/table/TableBody";
import TableRow from "../../../components/table/TableRow";
import TableCell from "../../../components/table/TableCell";

import TableActionButton from "../../../components/table/TableActionButton";

const CoursesList = () => {
  return (
    <Table>
      <TableHeader>
        <TableHead sortable={true}>Course Name</TableHead>
        <TableHead sortable={true} align={"right"}>
          Price
        </TableHead>
        <TableHead>Description</TableHead>
        <TableHead sortable={true}>Students</TableHead>
        <TableHead>Status</TableHead>
        <TableHead align="right">Actions</TableHead>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-foreground">Business English</p>
                <p className="text-xs text-muted-foreground">
                  English Language
                </p>
              </div>
            </div>
          </TableCell>
          <TableCell align="right">
            <div>
              <p className="font-semibold">¥25,000</p>
              <p className="text-xs text-muted-foreground">per course</p>
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell px-3 py-4">
            <p className="text-muted-foreground line-clamp-2 max-w-xs">
              Professional English for business communication and presentations
            </p>
          </TableCell>
          <TableCell className="hidden sm:table-cell px-3 py-4">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">24</span>
            </div>
          </TableCell>
          <TableCell className="hidden lg:table-cell px-3 py-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400"></span>
              Draft
            </span>
          </TableCell>
          <TableCell className="py-4 pl-3 pr-6 text-right">
            <div className="flex items-center justify-end gap-1">
              <TableActionButton
                icon={<Eye className="size-4" />}
                tooltip="View"
              />
              <TableActionButton
                icon={<Pencil className="size-4" />}
                tooltip="Edit"
              />
              <TableActionButton
                icon={<Trash2 className="size-4 text-destructive" />}
                tooltip="Delete"
              />
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-foreground">Business English</p>
                <p className="text-xs text-muted-foreground">
                  English Language
                </p>
              </div>
            </div>
          </TableCell>
          <TableCell align="right">
            <div>
              <p className="font-semibold">¥25,000</p>
              <p className="text-xs text-muted-foreground">per course</p>
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell px-3 py-4">
            <p className="text-muted-foreground line-clamp-2 max-w-xs">
              Professional English for business communication and presentations
            </p>
          </TableCell>
          <TableCell className="hidden sm:table-cell px-3 py-4">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">24</span>
            </div>
          </TableCell>
          <TableCell className="hidden lg:table-cell px-3 py-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400"></span>
              Draft
            </span>
          </TableCell>
          <TableCell className="py-4 pl-3 pr-6 text-right">
            <div className="flex items-center justify-end gap-1">
              <TableActionButton
                icon={<Eye className="size-4" />}
                tooltip="View"
              />
              <TableActionButton
                icon={<Pencil className="size-4" />}
                tooltip="Edit"
              />
              <TableActionButton
                icon={<Trash2 className="size-4 text-destructive" />}
                tooltip="Delete"
              />
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-foreground">Business English</p>
                <p className="text-xs text-muted-foreground">
                  English Language
                </p>
              </div>
            </div>
          </TableCell>
          <TableCell align="right">
            <div>
              <p className="font-semibold">¥25,000</p>
              <p className="text-xs text-muted-foreground">per course</p>
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell px-3 py-4">
            <p className="text-muted-foreground line-clamp-2 max-w-xs">
              Professional English for business communication and presentations
            </p>
          </TableCell>
          <TableCell className="hidden sm:table-cell px-3 py-4">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">24</span>
            </div>
          </TableCell>
          <TableCell className="hidden lg:table-cell px-3 py-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400"></span>
              Draft
            </span>
          </TableCell>
          <TableCell className="py-4 pl-3 pr-6 text-right">
            <div className="flex items-center justify-end gap-1">
              <TableActionButton
                icon={<Eye className="size-4" />}
                tooltip="View"
              />
              <TableActionButton
                icon={<Pencil className="size-4" />}
                tooltip="Edit"
              />
              <TableActionButton
                icon={<Trash2 className="size-4 text-destructive" />}
                tooltip="Delete"
              />
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-foreground">Business English</p>
                <p className="text-xs text-muted-foreground">
                  English Language
                </p>
              </div>
            </div>
          </TableCell>
          <TableCell align="right">
            <div>
              <p className="font-semibold">¥25,000</p>
              <p className="text-xs text-muted-foreground">per course</p>
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell px-3 py-4">
            <p className="text-muted-foreground line-clamp-2 max-w-xs">
              Professional English for business communication and presentations
            </p>
          </TableCell>
          <TableCell className="hidden sm:table-cell px-3 py-4">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">24</span>
            </div>
          </TableCell>
          <TableCell className="hidden lg:table-cell px-3 py-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400"></span>
              Draft
            </span>
          </TableCell>
          <TableCell className="py-4 pl-3 pr-6 text-right">
            <div className="flex items-center justify-end gap-1">
              <TableActionButton
                icon={<Eye className="size-4" />}
                tooltip="View"
              />
              <TableActionButton
                icon={<Pencil className="size-4" />}
                tooltip="Edit"
              />
              <TableActionButton
                icon={<Trash2 className="size-4 text-destructive" />}
                tooltip="Delete"
              />
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-foreground">Business English</p>
                <p className="text-xs text-muted-foreground">
                  English Language
                </p>
              </div>
            </div>
          </TableCell>
          <TableCell align="right">
            <div>
              <p className="font-semibold">¥25,000</p>
              <p className="text-xs text-muted-foreground">per course</p>
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell px-3 py-4">
            <p className="text-muted-foreground line-clamp-2 max-w-xs">
              Professional English for business communication and presentations
            </p>
          </TableCell>
          <TableCell className="hidden sm:table-cell px-3 py-4">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">24</span>
            </div>
          </TableCell>
          <TableCell className="hidden lg:table-cell px-3 py-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400"></span>
              Draft
            </span>
          </TableCell>
          <TableCell className="py-4 pl-3 pr-6 text-right">
            <div className="flex items-center justify-end gap-1">
              <TableActionButton
                icon={<Eye className="size-4" />}
                tooltip="View"
              />
              <TableActionButton
                icon={<Pencil className="size-4" />}
                tooltip="Edit"
              />
              <TableActionButton
                icon={<Trash2 className="size-4 text-destructive" />}
                tooltip="Delete"
              />
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-foreground">Business English</p>
                <p className="text-xs text-muted-foreground">
                  English Language
                </p>
              </div>
            </div>
          </TableCell>
          <TableCell align="right">
            <div>
              <p className="font-semibold">¥25,000</p>
              <p className="text-xs text-muted-foreground">per course</p>
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell px-3 py-4">
            <p className="text-muted-foreground line-clamp-2 max-w-xs">
              Professional English for business communication and presentations
            </p>
          </TableCell>
          <TableCell className="hidden sm:table-cell px-3 py-4">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">24</span>
            </div>
          </TableCell>
          <TableCell className="hidden lg:table-cell px-3 py-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400"></span>
              Draft
            </span>
          </TableCell>
          <TableCell className="py-4 pl-3 pr-6 text-right">
            <div className="flex items-center justify-end gap-1">
              <TableActionButton
                icon={<Eye className="size-4" />}
                tooltip="View"
              />
              <TableActionButton
                icon={<Pencil className="size-4" />}
                tooltip="Edit"
              />
              <TableActionButton
                icon={<Trash2 className="size-4 text-destructive" />}
                tooltip="Delete"
              />
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-foreground">Business English</p>
                <p className="text-xs text-muted-foreground">
                  English Language
                </p>
              </div>
            </div>
          </TableCell>
          <TableCell align="right">
            <div>
              <p className="font-semibold">¥25,000</p>
              <p className="text-xs text-muted-foreground">per course</p>
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell px-3 py-4">
            <p className="text-muted-foreground line-clamp-2 max-w-xs">
              Professional English for business communication and presentations
            </p>
          </TableCell>
          <TableCell className="hidden sm:table-cell px-3 py-4">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">24</span>
            </div>
          </TableCell>
          <TableCell className="hidden lg:table-cell px-3 py-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400"></span>
              Draft
            </span>
          </TableCell>
          <TableCell className="py-4 pl-3 pr-6 text-right">
            <div className="flex items-center justify-end gap-1">
              <TableActionButton
                icon={<Eye className="size-4" />}
                tooltip="View"
              />
              <TableActionButton
                icon={<Pencil className="size-4" />}
                tooltip="Edit"
              />
              <TableActionButton
                icon={<Trash2 className="size-4 text-destructive" />}
                tooltip="Delete"
              />
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-foreground">Business English</p>
                <p className="text-xs text-muted-foreground">
                  English Language
                </p>
              </div>
            </div>
          </TableCell>
          <TableCell align="right">
            <div>
              <p className="font-semibold">¥25,000</p>
              <p className="text-xs text-muted-foreground">per course</p>
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell px-3 py-4">
            <p className="text-muted-foreground line-clamp-2 max-w-xs">
              Professional English for business communication and presentations
            </p>
          </TableCell>
          <TableCell className="hidden sm:table-cell px-3 py-4">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">24</span>
            </div>
          </TableCell>
          <TableCell className="hidden lg:table-cell px-3 py-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400"></span>
              Draft
            </span>
          </TableCell>
          <TableCell className="py-4 pl-3 pr-6 text-right">
            <div className="flex items-center justify-end gap-1">
              <TableActionButton
                icon={<Eye className="size-4" />}
                tooltip="View"
              />
              <TableActionButton
                icon={<Pencil className="size-4" />}
                tooltip="Edit"
              />
              <TableActionButton
                icon={<Trash2 className="size-4 text-destructive" />}
                tooltip="Delete"
              />
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-foreground">Business English</p>
                <p className="text-xs text-muted-foreground">
                  English Language
                </p>
              </div>
            </div>
          </TableCell>
          <TableCell align="right">
            <div>
              <p className="font-semibold">¥25,000</p>
              <p className="text-xs text-muted-foreground">per course</p>
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell px-3 py-4">
            <p className="text-muted-foreground line-clamp-2 max-w-xs">
              Professional English for business communication and presentations
            </p>
          </TableCell>
          <TableCell className="hidden sm:table-cell px-3 py-4">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">24</span>
            </div>
          </TableCell>
          <TableCell className="hidden lg:table-cell px-3 py-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400"></span>
              Draft
            </span>
          </TableCell>
          <TableCell className="py-4 pl-3 pr-6 text-right">
            <div className="flex items-center justify-end gap-1">
              <TableActionButton
                icon={<Eye className="size-4" />}
                tooltip="View"
              />
              <TableActionButton
                icon={<Pencil className="size-4" />}
                tooltip="Edit"
              />
              <TableActionButton
                icon={<Trash2 className="size-4 text-destructive" />}
                tooltip="Delete"
              />
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default CoursesList;
