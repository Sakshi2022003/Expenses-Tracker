import React from "react";
import { Trash } from "lucide-react";
import { Expenses } from "@/utils/schema";
import { db } from "@/utils/dbConfig";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

function ExpenseListTable({ expensesList, refreshData }) {
  const deleteExpense = async (id) => {
    try {
      const result = await db
        .delete(Expenses)
        .where(eq(Expenses.id, id))
        .returning();

      if (result.length > 0) {
        toast.success("Expense Deleted!");
        refreshData(); // ✅ Correct way to update list
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense!");
    }
  };

  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg">Latest Expenses</h2>
      <div className="grid grid-cols-4 bg-slate-200 p-2 mt-3">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expensesList.map((expense, index) => (
        <div key={expense.id || index} className="grid grid-cols-4 bg-slate-50 p-2">
          <h2>{expense.name}</h2>
          <h2>₹{expense.amount}</h2>
          <h2>{new Date(expense.createdAt).toLocaleDateString()}</h2>
          <h2>
            <Trash
              className="text-red-600 cursor-pointer hover:text-red-800 transition"
              onClick={() => deleteExpense(expense.id)}
            />
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;
